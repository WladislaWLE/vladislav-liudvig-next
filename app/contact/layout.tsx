import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Связаться",
  description: "Свяжитесь с Владиславом Людвигом: форма, Telegram @wladislaw_le, WhatsApp +79501365214, email mail@vladislavliudvig.com. Отвечаю в течение 24 часов.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
