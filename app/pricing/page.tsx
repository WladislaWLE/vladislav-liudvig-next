"use client";

import { motion } from "framer-motion";
import { Zap, Bot, Globe, Building2, CreditCard, BarChart2, Check, ArrowRight, Gift } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap, Bot, Globe, Building2, CreditCard, BarChart2,
};

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag mb-4 block"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 inline-block" />
            {t.pricing.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-6xl text-white mb-4"
          >
            {t.pricing.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="body-text text-lg max-w-xl mx-auto mb-6"
          >
            {t.pricing.subtitle}
          </motion.p>

          {/* Loyalty badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 bg-gold/8 text-sm font-medium text-gold"
          >
            <Gift size={15} />
            {t.pricing.loyalty}
          </motion.div>
        </div>

        {/* Pricing grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
        >
          {t.pricing.items.map((item, i) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
                }}
                className="glass-card rounded-2xl p-7 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-glow-sm"
              >
                {/* Icon + price row */}
                <div className="flex items-start justify-between">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br p-px", item.gradient)}>
                    <div className="w-full h-full rounded-[10px] bg-bg-card flex items-center justify-center">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold text-xl gradient-text">{item.price}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-lg text-white mb-1">{item.title}</h3>
                  <p className="text-sm body-text">{item.desc}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2 flex-1">
                  {item.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-white/55">
                      <Check size={13} className="text-accent shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="btn-outline text-sm flex items-center justify-center gap-2 mt-auto"
                >
                  {t.pricing.cta}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-white/30 mb-16"
        >
          * {t.pricing.note}
        </motion.p>
      </div>

      <CtaBlock />
    </div>
  );
}
