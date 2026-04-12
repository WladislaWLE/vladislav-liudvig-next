"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock, LogOut, Plus, Trash2, Edit3, Save, X, ChevronDown, ChevronUp, DollarSign, FileText, Loader2 } from "lucide-react";

const ADMIN_PASSWORD = "vl2026admin";

// ---- Types ----

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  keywords?: string[];
}

interface PricingItem {
  id: string;
  title: string;
  price: string;
  desc: string;
}

// ---- Hardcoded defaults (mirroring the site data) ----

const defaultBlog: BlogPost[] = [
  {
    slug: "automation-saves-time",
    title: "Как автоматизация сохранила 30 часов в неделю для digital-агентства",
    excerpt: "Разбираем реальный кейс: что было до, что стало после и сколько стоила автоматизация рутинной отчётности.",
    date: "2026-03-15",
    category: "Автоматизация",
    readTime: "5 мин",
    content: "Контент статьи...",
  },
  {
    slug: "chatbot-sales-2026",
    title: "Telegram-бот вместо менеджера: миф или реальность в 2026?",
    excerpt: "Можно ли заменить менеджера по продажам чат-ботом? Разбираем кейсы, цифры и конкретные сценарии.",
    date: "2026-03-28",
    category: "Чат-боты",
    readTime: "7 мин",
    content: "Контент статьи...",
  },
  {
    slug: "us-llc-guide-2026",
    title: "Полный гайд: открываем LLC в США в 2026 году",
    excerpt: "Пошаговое руководство: выбор штата, документы, EIN, банковский счёт.",
    date: "2026-04-05",
    category: "США",
    readTime: "12 мин",
    content: "Контент статьи...",
  },
  {
    slug: "ai-agents-2026",
    title: "AI-агенты в 2026: что умеют и как использовать в бизнесе",
    excerpt: "Разбираем, что такое AI-агенты, чем они отличаются от чат-ботов и как внедрить их в процессы.",
    date: "2026-04-08",
    category: "AI",
    readTime: "8 мин",
    content: "Контент статьи...",
  },
  {
    slug: "us-market-entry-2026",
    title: "Как запустить бизнес на рынке США без офиса и визы",
    excerpt: "Минимальный стек для работы с американским рынком: юрлицо, банк, инструменты.",
    date: "2026-04-09",
    category: "США",
    readTime: "9 мин",
    content: "Контент статьи...",
  },
  {
    slug: "website-conversion-2026",
    title: "7 элементов сайта, которые влияют на конверсию",
    excerpt: "Разбираем конкретные паттерны: что делает сайт продающим, а не просто красивым.",
    date: "2026-04-10",
    category: "Сайты",
    readTime: "6 мин",
    content: "Контент статьи...",
  },
];

const defaultPricing: PricingItem[] = [
  { id: "automation", title: "Автоматизация бизнеса", price: "от $100", desc: "Скрипты, workflow, интеграции." },
  { id: "chatbots", title: "Умные чат-боты", price: "от $50", desc: "Telegram, WhatsApp, Web." },
  { id: "ai-systems", title: "AI-системы и дашборды", price: "от $500", desc: "CRM, аналитика, AI-агенты." },
  { id: "websites", title: "Премиальные сайты", price: "от $300", desc: "Дизайн + конверсия + SEO." },
  { id: "uscompany", title: "Регистрация в США", price: "от $300", desc: "LLC / Corp под ключ + EIN." },
  { id: "banking", title: "Счета в банках США", price: "от $50", desc: "Открытие бизнес-счёта." },
];

// ---- Storage helpers ----

const BLOG_KEY = "admin_blog_posts";
const PRICING_KEY = "admin_pricing_items";

function loadBlog(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOG_KEY);
    return raw ? JSON.parse(raw) : defaultBlog;
  } catch { return defaultBlog; }
}

function saveBlog(posts: BlogPost[]) {
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
}

function loadPricing(): PricingItem[] {
  try {
    const raw = localStorage.getItem(PRICING_KEY);
    return raw ? JSON.parse(raw) : defaultPricing;
  } catch { return defaultPricing; }
}

function savePricing(items: PricingItem[]) {
  localStorage.setItem(PRICING_KEY, JSON.stringify(items));
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

// ---- Login screen ----

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#010714] flex items-center justify-center px-4">
      <div className={`w-full max-w-sm ${shaking ? "animate-pulse" : ""}`}>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#3b7cf4]/20 border border-[#3b7cf4]/30 flex items-center justify-center">
            <Lock size={28} className="text-[#3b7cf4]" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-2">Панель управления</h1>
        <p className="text-sm text-white/40 text-center mb-8">Vladislav Liudvig · Admin</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Пароль"
              className={`w-full bg-[#0d1524] border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all pr-12
                ${error ? "border-red-500/60 focus:border-red-500" : "border-white/10 focus:border-[#3b7cf4]/60"}`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-400 text-center">Неверный пароль</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#3b7cf4] hover:bg-[#3b7cf4]/90 text-white font-semibold rounded-xl py-3 text-sm transition-all"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Blog management ----

function BlogEditor({ post, onSave, onCancel }: {
  post: Partial<BlogPost>;
  onSave: (p: BlogPost) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<BlogPost>({
    slug: post.slug ?? "",
    title: post.title ?? "",
    excerpt: post.excerpt ?? "",
    date: post.date ?? new Date().toISOString().slice(0, 10),
    category: post.category ?? "",
    readTime: post.readTime ?? "",
    content: post.content ?? "",
  });

  const set = (k: keyof BlogPost, v: string) => {
    const upd = { ...form, [k]: v };
    if (k === "title" && !post.slug) upd.slug = slugify(v);
    setForm(upd);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="w-full max-w-2xl bg-[#0a1628] border border-white/10 rounded-2xl p-7">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-white text-lg">{post.slug ? "Редактировать статью" : "Новая статья"}</h2>
          <button onClick={onCancel} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Заголовок</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)}
              className="w-full bg-[#0d1e35] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Slug (URL)</label>
              <input value={form.slug} onChange={(e) => set("slug", e.target.value)}
                className="w-full bg-[#0d1e35] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Дата</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                className="w-full bg-[#0d1e35] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Категория</label>
              <input value={form.category} onChange={(e) => set("category", e.target.value)}
                placeholder="Автоматизация, Чат-боты, США..."
                className="w-full bg-[#0d1e35] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Время чтения</label>
              <input value={form.readTime} onChange={(e) => set("readTime", e.target.value)}
                placeholder="5 мин"
                className="w-full bg-[#0d1e35] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Краткое описание</label>
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2}
              className="w-full bg-[#0d1e35] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all resize-none" />
          </div>
          <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Контент (Markdown)</label>
            <textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={14}
              placeholder="## Заголовок&#10;&#10;Текст статьи..."
              className="w-full bg-[#0d1e35] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-[#3b7cf4]/50 transition-all resize-none" />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onSave(form)}
            className="flex-1 bg-[#3b7cf4] hover:bg-[#3b7cf4]/90 text-white font-semibold rounded-xl py-2.5 text-sm transition-all flex items-center justify-center gap-2"
          >
            <Save size={15} /> Сохранить
          </button>
          <button
            onClick={onCancel}
            className="px-5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 rounded-xl text-sm transition-all"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { setPosts(loadBlog()); }, []);

  const save = (post: BlogPost) => {
    const existing = posts.findIndex((p) => p.slug === post.slug);
    const updated = existing >= 0
      ? posts.map((p, i) => (i === existing ? post : p))
      : [...posts, post];
    setPosts(updated);
    saveBlog(updated);
    setEditing(null);
  };

  const remove = (slug: string) => {
    if (!confirm("Удалить статью?")) return;
    const updated = posts.filter((p) => p.slug !== slug);
    setPosts(updated);
    saveBlog(updated);
  };

  return (
    <div>
      {editing !== null && (
        <BlogEditor post={editing} onSave={save} onCancel={() => setEditing(null)} />
      )}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[#3b7cf4]" />
          <h2 className="font-bold text-white">Блог</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/8 text-white/40">{posts.length}</span>
        </div>
        <button
          onClick={() => setEditing({})}
          className="flex items-center gap-1.5 text-sm bg-[#3b7cf4]/15 border border-[#3b7cf4]/30 hover:bg-[#3b7cf4]/25 text-[#3b7cf4] rounded-xl px-3 py-1.5 transition-all"
        >
          <Plus size={14} /> Новая статья
        </button>
      </div>

      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.slug} className="bg-[#0a1628] border border-white/8 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{post.title}</p>
                <p className="text-xs text-white/35 mt-0.5">{post.date} · {post.category} · {post.readTime}</p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => setEditing(post)} className="p-1.5 text-white/30 hover:text-[#3b7cf4] transition-colors">
                  <Edit3 size={15} />
                </button>
                <button onClick={() => remove(post.slug)} className="p-1.5 text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 size={15} />
                </button>
                <button onClick={() => setExpanded(expanded === post.slug ? null : post.slug)} className="p-1.5 text-white/30 hover:text-white transition-colors">
                  {expanded === post.slug ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
              </div>
            </div>
            {expanded === post.slug && (
              <div className="px-5 pb-4 border-t border-white/6">
                <p className="text-xs text-white/40 mt-3 mb-1">Анонс:</p>
                <p className="text-sm text-white/60">{post.excerpt}</p>
                <p className="text-xs text-white/25 mt-3">Slug: /blog/{post.slug}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-white/25 mt-4 text-center">
        Изменения сохраняются в браузере. Для публикации обновите файл{" "}
        <code className="text-white/35">app/blog/[slug]/page.tsx</code>
      </p>
    </div>
  );
}

function PricingSection() {
  const [items, setItems] = useState<PricingItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<PricingItem>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => { setItems(loadPricing()); }, []);

  const startEdit = (item: PricingItem) => {
    setEditingId(item.id);
    setEditValues({ ...item });
  };

  const cancelEdit = () => { setEditingId(null); setEditValues({}); };

  const saveEdit = () => {
    const updated = items.map((it) => it.id === editingId ? { ...it, ...editValues } : it);
    setItems(updated);
    savePricing(updated);
    setEditingId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <DollarSign size={18} className="text-[#e4a628]" />
        <h2 className="font-bold text-white">Прайс</h2>
        {saved && <span className="text-xs text-green-400 ml-2">Сохранено ✓</span>}
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0a1628] border border-white/8 rounded-xl px-5 py-3.5">
            {editingId === item.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Название</label>
                    <input value={editValues.title ?? ""} onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                      className="w-full bg-[#0d1e35] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Цена</label>
                    <input value={editValues.price ?? ""} onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                      placeholder="от $100"
                      className="w-full bg-[#0d1e35] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-white/40 mb-1">Описание</label>
                  <input value={editValues.desc ?? ""} onChange={(e) => setEditValues({ ...editValues, desc: e.target.value })}
                    className="w-full bg-[#0d1e35] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#3b7cf4]/50 transition-all" />
                </div>
                <div className="flex gap-2 pt-1">
                  <button onClick={saveEdit} className="flex items-center gap-1.5 text-sm bg-[#3b7cf4] text-white rounded-lg px-3 py-1.5 hover:bg-[#3b7cf4]/90 transition-all">
                    <Save size={13} /> Сохранить
                  </button>
                  <button onClick={cancelEdit} className="text-sm text-white/40 hover:text-white px-3 py-1.5 transition-colors">
                    Отмена
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="text-xs text-white/35 mt-0.5">{item.price} · {item.desc}</p>
                </div>
                <button onClick={() => startEdit(item)} className="p-1.5 text-white/30 hover:text-[#3b7cf4] transition-colors ml-4">
                  <Edit3 size={15} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-white/25 mt-4 text-center">
        После редактирования перенесите цены в{" "}
        <code className="text-white/35">lib/i18n.tsx</code> для публикации
      </p>
    </div>
  );
}

// ---- Main admin ----

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<"blog" | "pricing">("blog");

  useEffect(() => {
    const session = sessionStorage.getItem("admin_authed");
    if (session === "1") setAuthed(true);
    setChecking(false);
  }, []);

  const login = () => {
    sessionStorage.setItem("admin_authed", "1");
    setAuthed(true);
  };

  const logout = () => {
    sessionStorage.removeItem("admin_authed");
    setAuthed(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#010714] flex items-center justify-center">
        <Loader2 size={24} className="text-white/30 animate-spin" />
      </div>
    );
  }

  if (!authed) return <LoginScreen onLogin={login} />;

  return (
    <div className="min-h-screen bg-[#010714]">
      {/* Header */}
      <div className="border-b border-white/8 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3b7cf4] flex items-center justify-center">
              <span className="text-white font-bold text-xs">VL</span>
            </div>
            <span className="font-semibold text-white text-sm">Admin Panel</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
          >
            <LogOut size={14} /> Выйти
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/8 px-6">
        <div className="max-w-4xl mx-auto flex gap-1">
          {([["blog", "Блог", FileText], ["pricing", "Прайс", DollarSign]] as const).map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all
                ${tab === id
                  ? "border-[#3b7cf4] text-white"
                  : "border-transparent text-white/40 hover:text-white/70"}`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {tab === "blog" && <BlogSection />}
        {tab === "pricing" && <PricingSection />}
      </div>
    </div>
  );
}
