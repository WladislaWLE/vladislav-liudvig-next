"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function AboutSnippet() {
  const { t } = useI18n();

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="relative glass-card rounded-3xl overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-violet-500/5" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/6 rounded-full blur-3xl" />

        <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center gap-12">
          {/* Photo / Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative shrink-0"
          >
            <div className="w-36 h-36 md:w-44 md:h-44 relative">
              {/* Animated ring */}
              <motion.div
                className="absolute inset-[-4px] rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #3b7cf4, #8b5cf6, #3b7cf4)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[2px] rounded-full bg-bg-card overflow-hidden">
                <Image
                  src="/vl-photo.jpg"
                  alt="Vladislav Liudvig"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* Fallback initials */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/30 to-violet-500/30">
                  <span className="font-display font-bold text-4xl text-white/80">VL</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-tag mb-3 block md:inline-flex">{t.about.tag}</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-2 mb-4">
                {t.about.name}
              </h2>
              <p className="body-text text-lg leading-relaxed max-w-xl mb-8">
                {t.about.story[0]}
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {t.about.stats.map((s, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="font-display font-bold text-2xl gradient-text">
                      <AnimatedCounter value={s.value} suffix={s.suffix} delay={0.3 + i * 0.1} />
                    </div>
                    <div className="text-xs text-white/35 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-outline text-sm inline-flex items-center gap-2">
                {t.common.readMore}
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
