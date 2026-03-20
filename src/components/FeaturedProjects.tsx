"use client";

import { ArrowRight } from "lucide-react";
import { SectionCornerMarks } from "./GridLines";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      year: "2024",
      type: "Full-Stack EdTech Platform",
      title: "Full-Stack LeetCode Clone: Interactive Coding Workspace with Real-Time Compilation",
      stats: [
        { value: "50+", label: "Interactive problem modules with automated test cases and edge detection." },
        { value: "100ms", label: "Average code compilation and execution time using isolated sandboxing." },
      ],
      skills: "React, TypeScript, Monaco Editor, Node.js, Vercel",
      color: "bg-blue-100/50 dark:bg-blue-950/40 border dark:border-blue-800/40 dark:shadow-[0_0_40px_rgba(50,150,255,0.03)]",
    },
    {
      id: 2,
      year: "2025",
      type: "Marketing & Growth Engine",
      title: "Social Media Agency: Premium Viral-Engineered Growth Platform for Elite Brands",
      stats: [
        { value: "10M+", label: "Organic views generated through strategic viral roadmap deployment." },
        { value: "40%", label: "Average increase in client conversion rates using data-driven social auditing." },
      ],
      skills: "Framer Motion, Tailwind CSS, Custom Hooks, Vercel Backend",
      color: "bg-orange-100/50 dark:bg-orange-950/40 border dark:border-orange-800/40 dark:shadow-[0_0_40px_rgba(255,100,20,0.03)]",
    },
    {
      id: 3,
      year: "2024",
      type: "Productivity SaaS",
      title: "ZenTask: Real-Time Collaborative Task Management with Drag-and-Drop Workflow",
      stats: [
        { value: "150k+", label: "Active users managing complex workflows across distributed teams." },
        { value: "99.9%", label: "Uptime maintained through robust distributed architecture and monitoring." },
      ],
      skills: "Next.js, WebSocket, PostgreSQL, Prisma, Tailwind",
      color: "bg-purple-100/50 dark:bg-purple-950/40 border dark:border-purple-800/40 dark:shadow-[0_0_40px_rgba(200,50,255,0.03)]",
    },
    {
      id: 4,
      year: "2023",
      type: "3D Creative Portfolio",
      title: "Aura: Immersive 3D Experience for Creative Agencies with Smooth Kinetic Typography",
      stats: [
        { value: "98", label: "Lighthouse performance score with optimized asset loading and rendering." },
        { value: "5k+", label: "Github stars on the open-source component library developed for this project." },
      ],
      skills: "Three.js, GLSL, GSAP, WebGL, React Three Fiber",
      color: "bg-green-100/50 dark:bg-green-950/40 border dark:border-green-800/40 dark:shadow-[0_0_40px_rgba(20,255,100,0.03)]",
    }
  ];

  const [cards, setCards] = useState(projects);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const handleDragEnd = (e: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold || info.offset.x < -threshold) {
      setCards((prev) => {
        const newArr = [...prev];
        const frontCard = newArr.shift();
        if (frontCard) newArr.push(frontCard);
        return newArr;
      });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 md:mb-24 dark:text-white">
        Some <span className="font-bold">Of My</span> Featured Project
      </h2>

      {/* Adding a min-height so the absolutely positioned cards don't shrink the container */}
      <div className="relative mx-auto w-full max-w-5xl h-[850px] md:h-[950px] lg:h-[1000px] perspective-[1000px]">
        {cards.map((project, i) => {
          const isFront = i === 0;

          // As you scroll down, the back cards slide down (their `y` offset increases)
          // letting you peek at the information on their tops slightly more.
          const yOffset = useTransform(scrollYProgress, [0, 0.5, 1], [0, i * 20, i * 40]);

          return (
            <motion.div
              key={project.id}
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isFront ? handleDragEnd : undefined}
              animate={{
                top: i * -20, // Stack upwards purely in DOM 
                scale: 1 - i * 0.05,
                zIndex: cards.length - i,
              }}
              style={{
                top: 80, // Base offset from the top of the container
                y: yOffset,
                cursor: isFront ? 'grab' : 'auto',
                borderTop: '1px solid rgba(255,255,255,0.7)',
                // Give origin so it scales gracefully from top
                transformOrigin: "top center",
              }}
              whileDrag={{ cursor: 'grabbing', scale: 1.02, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`absolute w-full rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 ${project.color}`}
            >
              {/* Overlay that dims the cards in the back */}
              {!isFront && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: i * 0.2 }} 
                  className="absolute inset-0 bg-black/5 dark:bg-black/40 rounded-[30px] md:rounded-[40px] pointer-events-none" 
                />
              )}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 md:mb-8 border-b border-black/5 dark:border-white/10 pb-4 gap-2 sm:gap-0">
                <span className="bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full font-medium">{project.year}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{project.type}</span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 mb-8 md:mb-12">
                <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-medium max-w-3xl leading-snug tracking-tight dark:text-white">
                  {project.title}
                </h3>
                <button className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition border border-black/10 dark:border-white/20 text-black dark:text-white flex-shrink-0 self-end md:self-auto">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8 border-b border-black/5 dark:border-white/10 pb-6 md:pb-8">
                {project.stats.map((stat, idx) => (
                  <div key={idx}>
                    <p className="text-2xl font-medium mb-1 md:text-3xl md:mb-2 dark:text-white">{stat.value}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed pr-0 md:pr-8">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-8 md:mb-12">
                Skills - <span className="text-gray-500 dark:text-gray-400">{project.skills}</span>
              </p>

              <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] bg-white dark:bg-[#151515] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 relative flex flex-col pt-6 md:pt-8 px-4 md:px-8 items-center bg-gradient-to-tr from-white dark:from-[#151515] to-gray-50 dark:to-[#1e1e1e]">
                <div className="w-full max-w-lg space-y-4 text-center mt-2 md:mt-4">
                  <h4 className="text-xl md:text-3xl font-bold dark:text-white">Take Control, Reach Your Financial Goals</h4>
                  <div className="w-[200px] sm:w-[250px] md:w-[300px] h-[300px] md:h-[400px] mx-auto bg-black rounded-t-[30px] md:rounded-t-[40px] border-[4px] md:border-[6px] border-black mt-4 md:mt-8 bg-[url('https://images.unsplash.com/photo-1616077168079-7e0f5fa2435e?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center">
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
