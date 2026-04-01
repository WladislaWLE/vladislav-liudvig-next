"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Bot, Globe, Building2, CreditCard, ArrowRight, X, Send, Mail, Instagram, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Zap, Bot, Globe, Building2, CreditCard,
};

interface ServiceItem {
  id: string;
  title: string;
  short: string;
  full: string;
  gradient: string;
  icon: string;
}

function ServiceCard({ item, index, onOpen }: { item: ServiceItem; index: number; onOpen: (s: ServiceItem) => void }) {
  const Icon = iconMap[item.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass-card rounded-2xl p-7 flex flex-col gap-5 cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-glow-sm hover:border-white/12"
      onClick={() => onOpen(item)}
    >
      {/* Gradient hover bg */}
      <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500", item.gradient)} />

      {/* Icon */}
      <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br p-px", item.gradient)}>
        <div className="w-full h-full rounded-[10px] bg-bg-card flex items-center justify-center">
          <Icon size={22} className="text-white" />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-display font-semibold text-lg text-white mb-2">{item.title}</h3>
        <p className="text-sm body-text leading-relaxed">{item.short}</p>
      </div>

      <button className="flex items-center gap-1.5 text-xs font-semibold text-accent/70 group-hover:text-accent transition-colors w-fit">
        Подробнее
        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

export function ServicesSection({ limit }: { limit?: number }) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  const services = (limit ? t.services.items.slice(0, limit) : t.services.items) as ServiceItem[];

  const contactOptions = [
    { icon: Send, label: "Telegram", href: "https://t.me/wladislaw_le", color: "hover:border-blue-400/40 hover:text-blue-400" },
    { icon: Instagram, label: "Instagram", href: "https://instagram.com/wladislaw_le", color: "hover:border-pink-400/40 hover:text-pink-400" },
    { icon: MessageSquare, label: "WhatsApp", href: "https://wa.me/message/PLACEHOLDER", color: "hover:border-green-400/40 hover:text-green-400" },
    { icon: Mail, label: "Email", href: "mailto:mail@vladislavliudvig.com", color: "hover:border-red-400/40 hover:text-red-400" },
  ];

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
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-2" />
          {t.services.tag}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display font-bold text-4xl md:text-5xl text-white mb-4"
        >
          {t.services.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="body-text max-w-xl mx-auto"
        >
          {t.services.subtitle}
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((item, i) => (
          <ServiceCard key={item.id} item={item} index={i} onOpen={setSelected} />
        ))}
      </div>

      {limit && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/services" className="btn-outline text-sm inline-flex items-center gap-2">
            {t.common.allServices}
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 glass-card-bright rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                >
                  <X size={15} />
                </button>

                {/* Icon */}
                <div className={cn("w-14 h-14 rounded-2xl bg-gradient-to-br p-px mb-6", selected.gradient)}>
                  <div className="w-full h-full rounded-[14px] bg-bg-card flex items-center justify-center">
                    {(() => { const Icon = iconMap[selected.icon] || Zap; return <Icon size={26} className="text-white" />; })()}
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-3">{selected.title}</h3>
                <p className="body-text leading-relaxed mb-8">{selected.full}</p>

                {/* Contact block */}
                <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                  <p className="font-semibold text-white mb-1">{t.services.contact}</p>
                  <p className="text-xs text-white/35 mb-5">Выберите удобный способ связи</p>
                  <div className="grid grid-cols-4 gap-3">
                    {contactOptions.map((opt) => (
                      <a
                        key={opt.label}
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-xl border border-white/8 text-white/40 transition-all hover:-translate-y-0.5",
                          opt.color
                        )}
                      >
                        <opt.icon size={18} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">{opt.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
