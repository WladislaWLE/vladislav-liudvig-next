import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vladislavliudvig.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date("2026-04-10"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/products`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date("2026-04-12"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date("2026-04-10"), changeFrequency: "monthly", priority: 0.7 },
  ];

  const blogPosts = [
    { slug: "automation-saves-time", date: "2026-03-15" },
    { slug: "chatbot-sales-2026", date: "2026-03-28" },
    { slug: "us-llc-guide-2026", date: "2026-04-05" },
    { slug: "ai-agents-2026", date: "2026-04-08" },
    { slug: "us-market-entry-2026", date: "2026-04-09" },
    { slug: "website-conversion-2026", date: "2026-04-10" },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
