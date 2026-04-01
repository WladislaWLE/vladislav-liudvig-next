"use client";

import { motion } from "framer-motion";
import { ProductsTeaser } from "@/components/sections/ProductsTeaser";
import { CtaBlock } from "@/components/sections/CtaBlock";
import { useI18n } from "@/lib/i18n";

export default function ProductsPage() {
  const { t } = useI18n();

  return (
    <div className="pt-28">
      <div className="max-w-4xl mx-auto px-6 text-center mb-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="body-text text-lg max-w-2xl mx-auto"
        >
          {t.products.subtitle}
        </motion.p>
      </div>
      <ProductsTeaser />
      <CtaBlock />
    </div>
  );
}
