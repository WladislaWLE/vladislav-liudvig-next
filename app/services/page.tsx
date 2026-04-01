import type { Metadata } from "next";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CtaBlock } from "@/components/sections/CtaBlock";

export const metadata: Metadata = {
  title: "Services",
  description: "Business automation, intelligent chatbots, premium websites, and US company formation.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28">
      <ServicesSection />
      <CtaBlock />
    </div>
  );
}
