import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статьи и кейсы об автоматизации бизнеса, чат-ботах, AI-системах и выходе на рынок США. Реальный опыт, конкретные цифры, практические решения.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
