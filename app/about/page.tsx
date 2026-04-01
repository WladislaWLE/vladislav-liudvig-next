"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { Zap, Bot, Globe2, Building2, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const bulletIcons = [Zap, Bot, Globe2, Building2];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="pt-28 pb-20">
      {/* Hero section */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <motion.div
              className="absolute inset-[-4px] rounded-full"
              style={{ background: "conic-gradient(from 0deg, #3b7cf4, #8b5cf6, #e4a628, #3b7cf4)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative w-40 h-40 rounded-full overflow-hidden bg-bg-elevated border-2 border-bg">
              <Image
                src="/vl-photo.jpg"
                alt="Vladislav Liudvig"
                fill
                className="object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-violet-600/20">
                <span className="font-display font-bold text-5xl text-white/60">VL</span>
              </div>
            </div>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-tag mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 inline-block" />
            {t.about.tag}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-display font-bold text-4xl md:text-6xl text-white mb-3"
          >
            {t.about.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/40 mb-10"
          >
            {t.about.subtitle}
          </motion.p>
        </div>

        {/* Story paragraphs */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.5 } } }}
          className="max-w-2xl mx-auto space-y-5 text-center"
        >
          {t.about.story.map((p, i) => (
            <motion.p key={i} variants={item} className="body-text text-lg leading-relaxed">
              {p}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* Stats grid */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {t.about.stats.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass-card rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="font-display font-bold text-3xl gradient-text mb-1">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/35 leading-tight">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What I do */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-white text-center mb-10"
        >
          {t.about.bulletsTitle}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {t.about.bullets.map((b, i) => {
            const Icon = bulletIcons[i] || Zap;
            return (
              <motion.div
                key={i}
                variants={item}
                className="glass-card rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-white">{b.title}</h3>
                </div>
                <p className="text-sm body-text leading-relaxed">{b.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Workflow */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-bold text-3xl text-white text-center mb-10"
        >
          {t.about.workflow.title}
        </motion.h2>
        <div className="space-y-3">
          {t.about.workflow.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                {i + 1}
              </div>
              <span className="text-white/75">{step}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-3xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative z-10">
            <span className="text-4xl text-accent/30 font-display leading-none block mb-3">"</span>
            <p className="text-xl text-white/70 italic leading-relaxed">{t.about.quote}</p>
          </div>
        </motion.div>
      </section>

      <CtaBlock />
    </div>
  );
}
