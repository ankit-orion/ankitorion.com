"use client";

import { motion } from "framer-motion";

export function QuoteSection() {
  return (
    <section className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden bg-gray-50/30 dark:bg-[#080808]">
      <div className="py-16 md:py-24 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="space-y-6"
        >
          <span className="text-4xl md:text-6xl text-gray-200 dark:text-white/5 font-serif select-none">"</span>
          <p className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-relaxed italic text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Astronomy compels the soul to look upwards and leads us from this world to another.
          </p>
          <div className="flex flex-col items-center gap-4 pt-4">
             <div className="w-12 h-[1px] bg-gray-300 dark:bg-white/10" />
             <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                — Plato
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
