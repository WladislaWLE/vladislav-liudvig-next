# Vladislav Liudvig — Next.js Site · Claude Code Config
> Powered by Ruflo v3.5 · Integrated 2026-04-11

## Project Identity

| Field | Value |
|-------|-------|
| Project | vladislav-liudvig-next |
| Stack | Next.js 15 · TypeScript · Tailwind CSS v3 · Framer Motion |
| Deploy | Vercel (auto from GitHub) |
| Domain | vladislavliudvig.com |
| Owner | Vladislav Liudvig / Willen LLC |

## Behavioral Rules (Ruflo v3.5 — Always Enforced)

- Do what has been asked; nothing more, nothing less
- ALWAYS prefer editing an existing file to creating a new one
- NEVER create files unless absolutely necessary
- NEVER proactively create documentation or README files
- NEVER commit secrets, credentials, or `.env` files
- ALWAYS read a file before editing it
- ALWAYS batch related operations into ONE message (parallel execution)
- NEVER add error handling, fallbacks, or validation for impossible scenarios
- NEVER add features beyond what was asked

## Architecture

```
app/                    # Next.js 15 App Router pages
  (root)/page.tsx       # Homepage (all sections)
  about/page.tsx
  services/page.tsx
  pricing/page.tsx
  products/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx  # Static blog posts (SSG)
  contact/page.tsx
  admin/page.tsx        # Password-protected admin panel
  api/chat/route.ts     # Anthropic Claude chat endpoint
  api/contact/route.ts  # Contact form → Telegram + DB
components/
  layout/               # Navbar, Footer
  sections/             # Hero, AboutSnippet, ServicesSection, etc.
  ui/                   # AnimatedCounter, AIChatWidget, etc.
lib/
  i18n.tsx              # ALL translations (RU/EN) — as const
  utils.ts
public/
  vl-logo.png           # Main logo / favicon
  vl-photo.jpg          # Profile photo
```

## Key Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#010714` | Page bg |
| Accent | `#3b7cf4` | Primary CTA, links |
| Gold | `#e4a628` | Badges, highlights |
| Text | `#f1f5f9` | Primary text |
| Body text | `#94a3b8` | Secondary text |
| Font display | Bricolage Grotesque | Headings |
| Font body | DM Sans | Body copy |

## i18n System

All content lives in `lib/i18n.tsx` as a typed `as const` object. Structure:
```
translations.ru | translations.en
  nav, hero (stats with display/value/suffix/label), about, services,
  products, pricing, blog (posts with slug/title/excerpt/date/category/readTime/keywords),
  testimonials, cta, contact (form, channels), chat, footer
```

**Access via:** `useI18n()` hook → `{ t, lang, setLang }`

## Agent Roles (Ruflo Integration)

| Role | Trigger | Scope |
|------|---------|-------|
| **reviewer** | After any major feature | Code quality, TypeScript, best practices |
| **security-architect** | Before deploy | API exposure, credential handling, CORS |
| **coder** | New features | Follow existing patterns, stay DRY |
| **seo-performance** | After content changes | Core Web Vitals, metadata, schema |

## Concurrency Rules (Ruflo v3.5)

- ALL parallel reads → ONE message with multiple Read calls
- ALL related edits → ONE message with multiple Edit calls
- ALL terminal operations → ONE Bash call with `&&` or `;`
- TodoWrite → ALWAYS batch all todos in ONE call (5+ items)

## Hooks (Ruflo — Configured in .claude/settings.json)

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{"type": "command", "command": "echo '[ruflo] Pre-edit: $(date)'"}]
    }],
    "PostToolUse": [{
      "matcher": "Bash",
      "hooks": [{"type": "command", "command": "echo '[ruflo] Post-bash checkpoint'"}]
    }]
  }
}
```

## Security Rules

- `.env.local` — gitignored, contains real credentials (never commit)
- `.env.example` — placeholders only, safe to commit
- API routes exposed: `/api/chat`, `/api/contact` (no auth — rate limit on Vercel)
- Admin panel: client-side password only (sessionStorage) — sufficient for personal site
- ANTHROPIC_API_KEY: used server-side only in `/api/chat/route.ts`
- TELEGRAM_BOT_TOKEN + CHAT_ID: used server-side only in `/api/contact/route.ts`

## SEO Configuration

- Metadata: `app/layout.tsx` (title, description, keywords, OG, Twitter)
- Structured data: JSON-LD `Person` + `Offer[]` in `app/layout.tsx`
- Sitemap: `app/sitemap.ts` (auto-generated, static routes + blog slugs)
- Robots: `app/robots.ts` (allows all, disallows `/api/`)
- Domain verification: Cloudflare DNS TXT (Google Search Console + Yandex)
- Canonical: `https://vladislavliudvig.com`

## Deployment

1. Push to GitHub → Vercel auto-deploys
2. Env vars set in Vercel dashboard (not in code)
3. Domain: `vladislavliudvig.com` via Cloudflare DNS → Vercel

## Audit Checklist (Ruflo Review Gate)

Before deploying:
- [ ] `npx next build` passes with 0 errors
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] All pages render (no 404s on static routes)
- [ ] Blog posts load at `/blog/[slug]`
- [ ] Contact form sends Telegram notification
- [ ] Chat widget connects to Claude API
- [ ] Mobile layout verified on 375px viewport
- [ ] No real credentials in committed files
