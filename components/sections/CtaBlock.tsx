"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function CtaBlock() {
  const { t } = useI18n();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-bg-elevated to-violet-900/20" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-accent/20" />

        <div className="relative z-10 py-16 px-8 md:py-20 md:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 mb-6"
          >
            <Sparkles size={22} className="text-accent" />
          </motion.div>

          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="body-text text-lg max-w-xl mx-auto mb-10">
            {t.cta.subtitle}
          </p>

          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4"
          >
            {t.cta.button}
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
