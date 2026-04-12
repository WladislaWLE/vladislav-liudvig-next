import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Прайс",
  description: "Прозрачное ценообразование: автоматизация от $100, чат-боты от $50, AI-системы от $500, сайты от $300, регистрация LLC в США от $300. Постоянным клиентам скидка 10–15%.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
