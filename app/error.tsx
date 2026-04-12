"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
          Что-то пошло не так
        </h1>
        <p className="text-white/50 leading-relaxed mb-10">
          Произошла непредвиденная ошибка. Попробуйте обновить страницу или вернитесь на главную.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="btn-primary flex items-center justify-center gap-2 text-sm"
          >
            <RefreshCw size={15} />
            Попробовать снова
          </button>
          <Link
            href="/"
            className="btn-outline flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft size={15} />
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
