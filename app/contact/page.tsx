"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Instagram, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const channels = [
    {
      icon: Send,
      label: "Telegram",
      value: t.contact.channels.telegram,
      href: "https://t.me/wladislaw_le",
      color: "hover:border-blue-400/40 hover:bg-blue-400/5 hover:text-blue-400",
    },
    {
      icon: Mail,
      label: "Email",
      value: t.contact.channels.email,
      href: `mailto:${t.contact.channels.email}`,
      color: "hover:border-red-400/40 hover:bg-red-400/5 hover:text-red-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: t.contact.channels.instagram,
      href: "https://instagram.com/wladislaw_le",
      color: "hover:border-pink-400/40 hover:bg-pink-400/5 hover:text-pink-400",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      value: t.contact.channels.whatsapp,
      href: "https://wa.me/79501365214",
      color: "hover:border-green-400/40 hover:bg-green-400/5 hover:text-green-400",
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag mb-4 block"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 inline-block" />
            {t.contact.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-6xl text-white mb-4"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="body-text text-lg max-w-xl mx-auto"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-3xl p-8"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">{t.contact.form.successTitle}</h3>
                <p className="body-text">{t.contact.form.successDesc}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-outline text-sm mt-2"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    required
                    className="w-full bg-[#0d1524] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:border-accent/50 focus:bg-[#0a1628] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t.contact.form.emailPlaceholder}
                    required
                    className="w-full bg-[#0d1524] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:border-accent/50 focus:bg-[#0a1628] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t.contact.form.messagePlaceholder}
                    required
                    rows={5}
                    maxLength={5000}
                    className="w-full bg-[#0d1524] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:border-accent/50 focus:bg-[#0a1628] transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <div role="alert" className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                    <AlertCircle size={15} />
                    {t.contact.form.errorDesc}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "btn-primary flex items-center justify-center gap-2 text-sm mt-1",
                    status === "loading" && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {status === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Отправляем...</>
                  ) : (
                    <>{t.contact.form.submit} <Send size={15} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            {/* Direct channels */}
            <div className="glass-card rounded-3xl p-7">
              <h3 className="font-semibold text-white mb-5">{t.contact.channels.title}</h3>
              <div className="space-y-3">
                {channels.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border border-white/6 text-white/50 transition-all duration-200 group",
                      ch.color
                    )}
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/8">
                      <ch.icon size={17} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold text-white/50 mb-0.5">{ch.label}</p>
                      <p className="text-sm font-medium text-white/70">{ch.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div className="glass-card rounded-3xl p-7 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <div className="relative z-10">
                <span className="text-3xl text-accent/20 font-display leading-none block mb-2">"</span>
                <p className="text-white/60 italic leading-relaxed">{t.contact.quote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
