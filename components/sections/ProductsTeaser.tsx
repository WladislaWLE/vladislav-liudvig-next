"use client";

import { motion } from "framer-motion";
import { Wallet, Link2, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wallet, Link2, Zap,
};

export function ProductsTeaser() {
  const { t } = useI18n();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-tag mb-4 block"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block mr-2 animate-pulse" />
          {t.products.tag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-5xl text-white mb-4"
        >
          {t.products.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="body-text max-w-xl mx-auto"
        >
          {t.products.subtitle}
        </motion.p>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.products.items.map((product, i) => {
          const Icon = iconMap[product.icon] || Zap;
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative glass-card rounded-3xl overflow-hidden group"
            >
              {/* Gradient bg */}
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500", product.gradient)} />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: product.accentColor }} />

              <div className="relative z-10 p-8 md:p-10">
                {/* Badge + Icon row */}
                <div className="flex items-start justify-between mb-6">
                  <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br p-px", product.gradient)}>
                    <div className="w-full h-full rounded-[14px] bg-bg-card flex items-center justify-center">
                      <Icon size={26} className="text-white" />
                    </div>
                  </div>
                  <span className="badge-coming-soon">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    {t.products.comingSoon}
                  </span>
                </div>

                {/* Name + tagline */}
                <h3 className="font-display font-bold text-3xl text-white mb-1">{product.name}</h3>
                <p className="text-sm font-medium mb-4" style={{ color: product.accentColor }}>
                  {product.tagline}
                </p>
                <p className="body-text text-sm leading-relaxed mb-7">{product.desc}</p>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-8">
                  {product.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ background: product.accentColor }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-all group/link"
                  style={{ color: product.accentColor }}
                >
                  Узнать подробнее
                  <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
