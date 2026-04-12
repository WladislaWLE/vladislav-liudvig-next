import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Продукты",
  description: "PayFlow — сервис для оплаты зарубежных подписок из России по курсу ЦБ с минимальной комиссией. Netflix, Spotify, Adobe и 500+ сервисов. Скоро в открытом доступе.",
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
