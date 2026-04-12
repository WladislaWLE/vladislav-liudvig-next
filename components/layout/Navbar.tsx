"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/pricing", label: t.pricing?.tag ?? "Прайс" },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 bg-bg/80 backdrop-blur-xl border-b border-border"
            : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 shrink-0">
              <motion.div
                className="absolute inset-[-2px] rounded-full"
                style={{ background: "conic-gradient(from 0deg, #3b7cf4, #8b5cf6, #3b7cf4)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[1.5px] rounded-full overflow-hidden bg-[#010714]">
                <Image
                  src="/vl-logo.png"
                  alt="Vladislav Liudvig"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <span className="font-display font-semibold text-base text-white/90 group-hover:text-white transition-colors">
              Vladislav Liudvig
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/90"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8 border border-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "ru" ? "en" : "ru")}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 transition-all"
            >
              {t.common.switchLang}
            </button>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden md:block btn-primary text-sm py-2.5 px-5"
            >
              {t.nav.contact}
            </Link>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Открыть меню навигации"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-white/70 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <div id="mobile-menu" className="relative z-10 pt-24 px-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-5 py-4 rounded-2xl text-lg font-medium transition-all",
                      pathname === link.href
                        ? "bg-accent/15 text-white border border-accent/30"
                        : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-4 flex gap-3"
              >
                <button
                  onClick={() => { setLang(lang === "ru" ? "en" : "ru"); setMenuOpen(false); }}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider text-white/50 border border-white/10 hover:border-white/20 transition-all"
                >
                  {t.common.switchLang}
                </button>
                <Link
                  href="/contact"
                  className="flex-1 btn-primary text-sm py-3 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {t.nav.contact}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
