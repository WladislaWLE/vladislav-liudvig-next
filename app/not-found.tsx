import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Страница не найдена",
};

export default function NotFound() {
  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        {/* Glowing 404 */}
        <div className="relative mb-8 inline-block">
          <span
            className="font-display font-bold text-[120px] md:text-[160px] leading-none select-none"
            style={{
              background: "linear-gradient(135deg, #f1f5f9 0%, #93c5fd 50%, #3b7cf4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(59,124,244,0.3))",
            }}
          >
            404
          </span>
        </div>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
          Страница не найдена
        </h1>
        <p className="text-white/50 leading-relaxed mb-10">
          Такой страницы не существует. Возможно, она была перемещена, удалена или вы перешли по неверной ссылке.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft size={15} />
            На главную
          </Link>
          <Link
            href="/contact"
            className="btn-outline flex items-center justify-center gap-2 text-sm"
          >
            <Search size={15} />
            Связаться
          </Link>
        </div>
      </div>
    </div>
  );
}
