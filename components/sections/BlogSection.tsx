"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function BlogSection() {
  const { t } = useI18n();

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-tag mb-3 block"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-2" />
            {t.blog.tag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-white"
          >
            {t.blog.title}
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/blog" className="btn-outline text-sm inline-flex items-center gap-2">
            {t.blog.allPosts}
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {t.blog.posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Category + read time */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent/80">
                <Tag size={11} />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/30">
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="font-display font-semibold text-white leading-snug mb-3 group-hover:text-accent/90 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm body-text leading-relaxed line-clamp-3">{post.excerpt}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/6">
              <span className="text-xs text-white/25">
                {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-semibold text-accent/60 hover:text-accent flex items-center gap-1 transition-colors"
              >
                {t.blog.readMore}
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
