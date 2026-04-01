import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSnippet } from "@/components/sections/AboutSnippet";
import { ProductsTeaser } from "@/components/sections/ProductsTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBlock } from "@/components/sections/CtaBlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection limit={3} />
      <AboutSnippet />
      <ProductsTeaser />
      <Testimonials />
      <CtaBlock />
    </>
  );
}
