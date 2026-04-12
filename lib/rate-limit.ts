// Simple in-memory rate limiter (no external deps)
// Works per serverless function instance — sufficient for a personal site.
// Resets on cold start; protects against burst abuse, not distributed attacks.

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 600_000) return; // run every 10 min
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function checkRateLimit(
  ip: string,
  prefix: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSec: number } {
  cleanup();
  const key = `${prefix}:${ip}`;
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, retryAfterSec: 0 };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count, retryAfterSec: 0 };
}
