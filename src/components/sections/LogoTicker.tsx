"use client";

import { motion } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";

const techs = [
  { name: "React",        icon: "/svg icons/React.svg" },
  { name: "Next.js",      icon: "/svg icons/Next.js.svg" },
  { name: "TypeScript",   icon: "/svg icons/TypeScript.svg" },
  { name: "JavaScript",   icon: "/svg icons/JavaScript.svg" },
  { name: "Node.js",      icon: "/svg icons/Node.js.svg" },
  { name: "Tailwind CSS", icon: "/svg icons/Tailwind CSS.svg" },
  { name: "HTML5",        icon: "/svg icons/HTML5.svg" },
  { name: "CSS3",         icon: "/svg icons/CSS3.svg" },
  { name: "Express",      icon: "/svg icons/Express.svg" },
  { name: "MySQL",        icon: "/svg icons/MySQL.svg" },
  { name: "AWS",          icon: "/svg icons/AWS.svg" },
  { name: "Kubernetes",   icon: "/svg icons/Kubernetes.svg" },
  { name: "Git",          icon: "/svg icons/Git.svg" },
  { name: "GitHub",       icon: "/svg icons/GitHub.svg" },
  { name: "Azure",        icon: "/svg icons/Azure.svg" },
  { name: "Go",           icon: "/svg icons/Go.svg" },
  { name: "Angular",      icon: "/svg icons/Angular.svg" },
  { name: "Appwrite",     icon: "/svg icons/Appwrite.svg" },
  { name: "Postman",      icon: "/svg icons/Postman.svg" },
  { name: "C++",          icon: "/svg icons/C++ (CPlusPlus).svg" },
];

export function LogoTicker() {
  const columns = [
    techs.slice(0, 5),
    techs.slice(5, 10),
    techs.slice(10, 15),
    techs.slice(15, 20),
  ];

  return (
    <section className="relative w-full bg-white dark:bg-[#050505] border-b border-black/[0.06] dark:border-white/[0.06]">
      <SectionCornerMarks />

      <div className="py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-44 2xl:px-56 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-stretch">

          {/* Left: text — matches project card left column */}
          <div className="flex-1 flex flex-col justify-center lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">
                <span className="text-xs">✦</span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Tech Stack
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
                Key Technologies<br />
                <span className="text-gray-400 dark:text-gray-500 font-medium italic">&amp; Platforms</span>
              </h2>

              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
                A curated set of modern tools I use to build fast, scalable, and production-ready applications.
              </p>

            </motion.div>
          </div>

          {/* Right: icon grid — matches project card right column (white box, same style) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-[1.2] lg:flex-1"
          >
            <div className="w-full h-full rounded-[20px] sm:rounded-[28px] md:rounded-[32px] shadow-lg border border-black/[0.06] dark:border-white/[0.08] overflow-hidden p-4 sm:p-5 md:p-6 bg-gradient-to-tr from-gray-50 to-white dark:from-[#111] dark:to-[#1a1a1a]">
              <style>{`
                @keyframes scroll-up   { from { transform: translateY(0); } to { transform: translateY(-50%); } }
                @keyframes scroll-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
              `}</style>
              <div className="flex gap-3 sm:gap-4 h-[300px] sm:h-[340px] md:h-[360px]">
                {columns.map((col, colIdx) => {
                  const isUp = colIdx % 2 === 0;
                  const doubled = [...col, ...col];
                  const duration = 12 + colIdx * 2;
                  return (
                    <div key={colIdx} className="flex-1 overflow-hidden">
                      <div
                        style={{
                          animation: `${isUp ? "scroll-up" : "scroll-down"} ${duration}s linear infinite`,
                          willChange: "transform",
                        }}
                      >
                        {doubled.map((tech, idx) => (
                          <div key={`${tech.name}-${idx}`} className="pb-4 sm:pb-5">
                            <div className="group flex flex-col items-center gap-1.5">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[10px] sm:rounded-[13px] bg-white border border-black/[0.06] flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200 overflow-hidden p-1.5 sm:p-2">
                                <img
                                  src={tech.icon}
                                  alt={tech.name}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                              <span className="text-[11px] font-medium text-gray-600 dark:text-white text-center leading-tight w-full truncate px-0.5">
                                {tech.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
