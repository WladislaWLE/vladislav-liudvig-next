"use client";

import Link from "next/link";
import { Send, Mail, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/products", label: t.nav.products },
    { href: "/contact", label: t.nav.contact },
  ];

  const socials = [
    { icon: Send, label: "Telegram", href: "https://t.me/wladislaw_le" },
    { icon: Mail, label: "Email", href: "mailto:mail@vladislavliudvig.com" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/wladislaw_le" },
  ];

  const tgChannelUrl = "https://t.me/vladislavliudvig";

  return (
    <footer className="relative mt-20 border-t border-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-accent/20" />
                <div className="absolute inset-[3px] rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-white font-display font-bold text-sm">VL</span>
                </div>
              </div>
              <span className="font-display font-semibold text-white/80">Vladislav Liudvig</span>
            </Link>
            <p className="text-sm body-text max-w-xs">{t.footer.tagline}</p>
            <div className="flex gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/8 text-white/40 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all"
                  aria-label={s.label}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              {t.footer.nav}
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company info + TG channel */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">
              {t.footer.company}
            </h4>
            <div className="space-y-2 text-sm text-white/40">
              <p>{t.footer.address}</p>
              <p>{t.footer.ein}</p>
              <a
                href="mailto:mail@vladislavliudvig.com"
                className="block hover:text-white/70 transition-colors"
              >
                mail@vladislavliudvig.com
              </a>
            </div>
            {/* Telegram channel promo */}
            <a
              href={tgChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-accent/25 bg-accent/6 hover:bg-accent/12 hover:border-accent/40 transition-all group w-fit"
            >
              <Send size={14} className="text-accent shrink-0" />
              <div>
                <p className="text-xs font-semibold text-accent">{t.footer.channel}</p>
                <p className="text-xs text-white/35">{t.footer.channelHandle}</p>
              </div>
            </a>
          </div>
        </div>

        <div className="glow-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <span>{t.footer.rights}</span>
          <span className="hidden md:block">
            Built with Next.js · Deployed on Vercel
          </span>
        </div>
      </div>
    </footer>
  );
}
