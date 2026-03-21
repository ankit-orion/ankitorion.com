"use client";

import { Check, Zap, Sparkles, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";

const services = [
  {
    title: "Web App Design",
    description: "End-to-end design for complex SaaS platforms and dashboards. Focused on clarity and user efficiency.",
    icon: Building2,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Mobile App Design",
    description: "Intuitive and beautiful mobile experiences across iOS and Android with a focus on ease of use.",
    icon: Zap,
    color: "bg-yellow-500/10 text-yellow-600",
  },
  {
    title: "Conversion-Focused Landing Pages",
    description: "Strategic design that guides users toward action and maximizes your marketing budget.",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Design Systems",
    description: "Building scalable UI kits and component libraries to maintain consistency across your products.",
    icon: Check,
    color: "bg-green-500/10 text-green-600",
  },
];

export function Services() {
  return (
    <section id="services" className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight dark:text-white">
            What I <span className="text-gray-400 dark:text-gray-500 font-medium">Can Do For You</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            I combine strategy, psychology, and aesthetics to solve business problems and delight users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group p-8 rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#111] hover:border-gray-200 dark:hover:border-white/20 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{service.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
