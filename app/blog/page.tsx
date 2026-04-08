"use client";

import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function BlogPage() {
  const { t } = useI18n();

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="section-tag mb-4 block"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2 inline-block" />
            {t.blog.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-6xl text-white mb-4"
          >
            {t.blog.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="body-text text-lg max-w-xl mx-auto"
          >
            {t.blog.subtitle}
          </motion.p>
        </div>

        {/* Posts */}
        <div className="space-y-5">
          {t.blog.posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="glass-card rounded-2xl p-7 flex flex-col md:flex-row gap-6 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent/80">
                    <Tag size={11} />
                    {post.category}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs text-white/25">
                    {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                </div>
                <h2 className="font-display font-semibold text-xl text-white mb-2 group-hover:text-accent/90 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm body-text leading-relaxed mb-4">{post.excerpt}</p>
                {/* SEO keywords */}
                <div className="flex flex-wrap gap-2">
                  {post.keywords.slice(0, 3).map((kw) => (
                    <span key={kw} className="text-xs px-2.5 py-1 rounded-full bg-white/4 border border-white/8 text-white/35">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-between gap-4 md:w-32">
                <Link
                  href={`/blog/${post.slug}`}
                  className="btn-outline text-xs px-4 py-2 inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  {t.blog.readMore}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Telegram channel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <div className="relative z-10">
            <p className="text-white/40 text-sm mb-2">Больше материалов — в нашем канале</p>
            <a
              href="https://t.me/vladislavliudvig"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Telegram-канал @vladislavliudvig
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
