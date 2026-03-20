"use client";

import { ArrowRight } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";
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

      <div className="relative mx-auto w-full max-w-5xl h-[850px] md:h-[950px] lg:h-[1000px] perspective-[1000px]">
        {cards.map((project, i) => {
          const isFront = i === 0;
          
          // Fan upwards logic:
          // Cards at higher indices (further back) shift UPWARDS as we scroll.
          const yOffset = useTransform(
            scrollYProgress, 
            [0, 0.4, 0.8, 1], 
            [0, i * -30, i * -65, i * -90]
          );

          return (
            <motion.div
              key={project.id}
              drag={isFront ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={isFront ? handleDragEnd : undefined}
              animate={{
                scale: 1 - i * 0.045,
                zIndex: cards.length - i,
                filter: `brightness(${1 - i * 0.12}) blur(${i * 0.4}px)`,
              }}
              style={{
                top: 200 - i * 25, // Front card is lower, background cards are higher (peeking from top)
                y: yOffset,
                cursor: isFront ? 'grab' : 'auto',
                borderTop: '1px solid rgba(255,255,255,0.4)',
                transformOrigin: "bottom center", // Revealed from top, so anchor to bottom
              }}
              whileDrag={{ cursor: 'grabbing', scale: 1.02, rotate: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 160, 
                damping: 24,
                mass: 0.9
              }}
              className={`absolute w-full rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 ${project.color}`}
            >
              {!isFront && (
                <div className="absolute inset-0 bg-white/5 dark:bg-black/25 rounded-[30px] md:rounded-[40px] pointer-events-none" />
              )}

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 md:mb-8 border-b border-black/5 dark:border-white/10 pb-4 gap-2 sm:gap-0">
                <span className="bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full font-medium tracking-tight">{project.year}</span>
                <span className="font-semibold uppercase tracking-wider text-[10px] md:text-xs text-gray-400 dark:text-gray-500">{project.type}</span>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-8 mb-8 md:mb-12">
                <h3 className="text-2xl sm:text-3xl lg:text-[40px] font-bold max-w-3xl leading-snug tracking-tight dark:text-white">
                  {project.title}
                </h3>
                
                {/* Glowing & Pulsing Action Button */}
                <motion.button 
                  animate={isFront ? {
                    boxShadow: [
                      "0 0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 0 12px rgba(59, 130, 246, 0.2)",
                      "0 0 0 0px rgba(59, 130, 246, 0)"
                    ]
                  } : {}}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2.5,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative p-4 md:p-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex-shrink-0 self-end md:self-auto shadow-xl transition-colors group"
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  {isFront && (
                    <span className="absolute -inset-1 bg-blue-500/20 rounded-full blur-xl -z-10 animate-pulse" />
                  )}
                </motion.button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8 border-b border-black/5 dark:border-white/10 pb-6 md:pb-8">
                {project.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl font-bold md:text-4xl dark:text-white tracking-tighter">{stat.value}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium leading-relaxed max-w-[200px]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-8 md:mb-12">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Toolkit</span>
                <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {project.skills}
                </p>
              </div>

              {/* Enhanced Visual Preview Wrapper */}
              <div className="w-full h-[250px] sm:h-[300px] md:h-[450px] bg-white dark:bg-[#0c0c0c] rounded-2xl md:rounded-3xl overflow-hidden shadow-inner border border-black/5 dark:border-white/5 relative flex flex-col pt-6 md:pt-10 px-4 md:px-10 items-center">
                <div className="w-full max-w-xl space-y-4 text-center mt-2 md:mt-4">
                  <h4 className="text-lg md:text-2xl font-bold dark:text-white opacity-80">Next-Gen Interface Experience</h4>
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-[200px] sm:w-[280px] md:w-[360px] h-[350px] md:h-[500px] mx-auto bg-black rounded-t-[30px] md:rounded-t-[50px] border-[6px] md:border-[10px] border-[#1a1a1a] dark:border-[#222] mt-4 md:mt-12 shadow-2xl relative overflow-hidden"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${project.id === 1 ? '1616077168079-7e0f5fa2435e' : project.id === 2 ? '1460925895917-afdab827c52f' : '1551288049-bebda4e38f71'}?q=80&w=800`} 
                      alt="Project preview" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
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
