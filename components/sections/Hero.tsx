"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

/* Particle field */
function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 8,
    duration: Math.random() * 8 + 6,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* Cursor glow */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed pointer-events-none z-0 rounded-full"
      style={{
        x: useTransform(springX, (v) => v - 300),
        y: useTransform(springY, (v) => v - 300),
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(59,124,244,0.06) 0%, transparent 70%)",
      }}
    />
  );
}

/* Typewriter */
function Typewriter({ text, className }: { text: string; className?: string }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setShown("");
    setDone(false);
    const timer = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, 38);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className={className}>
      {shown}
      {!done && <span className="cursor-blink ml-0.5 text-accent">|</span>}
    </span>
  );
}

export function Hero() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/8 via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <ParticleField />
      <CursorGlow />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Tag */}
          <motion.div variants={item}>
            <span className="section-tag">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t.hero.tag}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight"
          >
            <Typewriter text={t.hero.title} className="block text-white" />
            <span className="block gradient-text mt-1">{t.hero.titleAccent}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="max-w-2xl text-lg md:text-xl body-text leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Feature list */}
          <motion.ul variants={item} className="flex flex-col gap-2.5 mt-2">
            {t.hero.features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.12, duration: 0.5 }}
                className="flex items-center gap-2.5 text-sm text-white/60"
              >
                <CheckCircle2 size={15} className="text-accent shrink-0" />
                {f}
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Link href="/services" className="btn-primary flex items-center justify-center gap-2 text-sm">
              {t.hero.cta}
              <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-outline text-sm flex items-center justify-center">
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 pb-20"
      >
        <div className="glass-card rounded-2xl px-8 py-5 grid grid-cols-3 divide-x divide-white/6">
          {t.hero.stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 px-4">
              <span className="font-display font-bold text-2xl md:text-3xl text-white">
                <AnimatedCounter value={s.value} suffix={s.suffix} delay={2 + i * 0.2} />
              </span>
              <span className="text-xs text-white/35 text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
