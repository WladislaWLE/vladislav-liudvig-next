import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обо мне",
  description: "Владислав Людвиг — предприниматель, технолог и строитель систем. 2+ года помогаю компаниям в Европе, США и СНГ автоматизировать процессы, запускать чат-ботов и выходить на рынок США.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
