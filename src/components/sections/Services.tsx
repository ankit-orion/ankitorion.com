"use client";

import { Layers, Server, Cloud, Database } from "lucide-react";
import { motion } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";

export function Services() {
  return (
    <section id="services" className="relative w-full overflow-hidden">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-44 2xl:px-56 max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 mb-6">
            <span className="text-xs">✦</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
            What I Do<br />
            <span className="text-gray-400 dark:text-gray-500 font-medium italic">& how I do it</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">

          {/* Card 1 — Large, spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
            className="sm:col-span-2 rounded-[24px] border border-black/[0.07] dark:border-white/[0.08] bg-black dark:bg-white p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[260px] group overflow-hidden relative"
          >
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5 dark:bg-black/5" />
            <div className="absolute -right-4 -bottom-10 w-56 h-56 rounded-full bg-white/[0.03] dark:bg-black/[0.03]" />
            <div className="w-12 h-12 rounded-2xl bg-white/10 dark:bg-black/10 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-white dark:text-black" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-black mb-3 tracking-tight">
                Full-Stack Development
              </h3>
              <p className="text-white/60 dark:text-black/50 text-sm md:text-base leading-relaxed max-w-md">
                Building complete web applications from UI to database — fast, scalable, and production-ready.
              </p>
            </div>
          </motion.div>

          {/* Card 2 — Small */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="rounded-[24px] border border-black/[0.07] dark:border-white/[0.08] bg-gray-50 dark:bg-[#111] p-7 md:p-8 flex flex-col justify-between min-h-[220px] group"
          >
            <div className="w-11 h-11 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-auto">
              <Server className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2 tracking-tight">
                Backend & API Development
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                Robust REST APIs and microservices that handle real-world load.
              </p>
            </div>
          </motion.div>

          {/* Card 3 — Small */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="rounded-[24px] border border-black/[0.07] dark:border-white/[0.08] bg-gray-50 dark:bg-[#111] p-7 md:p-8 flex flex-col justify-between min-h-[220px] group"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-auto">
              <Cloud className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-bold text-black dark:text-white mb-2 tracking-tight">
                DevOps & Cloud Infrastructure
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                CI/CD pipelines and containerized deployments on AWS and Azure.
              </p>
            </div>
          </motion.div>

          {/* Card 4 — Large, spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="sm:col-span-2 rounded-[24px] border border-black/[0.07] dark:border-white/[0.08] bg-gray-50 dark:bg-[#111] p-8 md:p-10 flex flex-col justify-between min-h-[220px] md:min-h-[260px] group"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3 tracking-tight">
                Database Design
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                Structuring efficient schemas, writing optimized queries, and managing data at scale.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
