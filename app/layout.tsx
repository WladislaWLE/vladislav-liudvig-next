import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatWidget } from "@/components/ui/AIChatWidget";

export const metadata: Metadata = {
  title: {
    default: "Vladislav Liudvig — Business Automation & Digital Infrastructure",
    template: "%s | Vladislav Liudvig",
  },
  description: "Business automation, intelligent chatbots, premium websites, and US company formation. Building digital infrastructure that works for you.",
  keywords: ["business automation", "chatbots", "website development", "US company registration", "LLC formation", "digital infrastructure", "автоматизация бизнеса"],
  authors: [{ name: "Vladislav Liudvig" }],
  creator: "Vladislav Liudvig",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
    siteName: "Vladislav Liudvig",
    title: "Vladislav Liudvig — Business Automation & Digital Infrastructure",
    description: "From intelligent chatbots to US company formation. Building systems that scale.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vladislav Liudvig — Business Automation",
    description: "From intelligent chatbots to US company formation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
