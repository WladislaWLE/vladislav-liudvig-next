"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag mb-4 block"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-2" />
            {t.testimonials.tag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white"
          >
            {t.testimonials.title}
          </motion.h2>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-5 px-6 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {[...t.testimonials.items, ...t.testimonials.items].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % t.testimonials.items.length) * 0.08 }}
            className="glass-card rounded-2xl p-7 w-[340px] shrink-0 flex flex-col gap-5"
          >
            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} size={14} className="text-gold fill-gold" />
              ))}
            </div>

            {/* Quote icon */}
            <Quote size={20} className="text-accent/30" />

            {/* Text */}
            <p className="text-sm body-text leading-relaxed flex-1">"{item.text}"</p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-violet-500/30 flex items-center justify-center text-xs font-bold text-white">
                {item.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-white/35">{item.role} · {item.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
