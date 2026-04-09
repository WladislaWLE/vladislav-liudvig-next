import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatWidget } from "@/components/ui/AIChatWidget";

export const metadata: Metadata = {
  title: {
    default: "Vladislav Liudvig — Автоматизация бизнеса, чат-боты, сайты, регистрация в США",
    template: "%s | Vladislav Liudvig",
  },
  description: "Автоматизация бизнеса, умные чат-боты, AI-системы, премиальные сайты и регистрация компаний в США. Строю цифровую инфраструктуру, которая работает на вас.",
  keywords: [
    "автоматизация бизнеса", "чат-боты для бизнеса", "telegram бот", "whatsapp бот",
    "создание сайтов", "регистрация LLC в США", "открытие компании в США", "EIN США",
    "AI агенты для бизнеса", "CRM система", "дашборд для бизнеса",
    "business automation", "chatbot development", "US company registration",
    "Vladislav Liudvig", "Владислав Людвиг",
  ],
  authors: [{ name: "Vladislav Liudvig", url: "https://vladislavliudvig.com" }],
  creator: "Vladislav Liudvig",
  metadataBase: new URL("https://vladislavliudvig.com"),
  alternates: {
    canonical: "https://vladislavliudvig.com",
    languages: { "ru": "/", "en": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    siteName: "Vladislav Liudvig",
    title: "Vladislav Liudvig — Автоматизация бизнеса и цифровая инфраструктура",
    description: "Чат-боты, AI-системы, сайты, регистрация в США. Строю системы, которые освобождают время и приносят деньги.",
    url: "https://vladislavliudvig.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vladislav Liudvig — Автоматизация бизнеса",
    description: "Чат-боты, AI-системы, сайты, регистрация в США.",
    creator: "@wladislaw_le",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Верификация через DNS TXT на Cloudflare — meta-теги не нужны
  // Google Search Console и Яндекс.Вебмастер подтверждены через DNS
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vladislav Liudvig",
  alternateName: "Владислав Людвиг",
  url: "https://vladislavliudvig.com",
  sameAs: [
    "https://t.me/wladislaw_le",
    "https://t.me/vladislavliudvig",
    "https://instagram.com/wladislaw_le",
  ],
  jobTitle: "Business Automation Specialist",
  description: "Специалист по автоматизации бизнеса, чат-ботам, AI-системам и регистрации компаний в США.",
  knowsAbout: [
    "Business Automation", "Chatbot Development", "AI Systems", "Website Development",
    "US Company Formation", "CRM Development", "Telegram Bots",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Willen LLC",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1910 Thomes Ave.",
      addressLocality: "Cheyenne",
      addressRegion: "WY",
      postalCode: "82001",
      addressCountry: "US",
    },
  },
  offers: [
    { "@type": "Offer", name: "Автоматизация бизнеса", description: "Скрипты и workflow для оптимизации бизнес-процессов" },
    { "@type": "Offer", name: "Умные чат-боты", description: "Боты для Telegram, WhatsApp и Web" },
    { "@type": "Offer", name: "AI-системы и дашборды", description: "CRM, аналитические дашборды и AI-агенты" },
    { "@type": "Offer", name: "Премиальные сайты", description: "Продающие сайты с дизайном и SEO" },
    { "@type": "Offer", name: "Регистрация компаний в США", description: "LLC / Corp под ключ" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <I18nProvider>
          <Navbar />
          <main className="pt-0">{children}</main>
          <Footer />
          <AIChatWidget />
        </I18nProvider>
      </body>
    </html>
  );
}
