"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";
import { useState, useEffect } from "react";

const curatedBooks = [
  { 
    title: "Meditations", 
    author: "Marcus Aurelius", 
    quote: "The happiness of your life depends upon the quality of your thoughts.", 
    id: "01",
    hue: "black" 
  },
  { 
    title: "The Republic", 
    author: "Plato", 
    quote: "Philosophy begins in wonder. Knowledge is the food of the soul.", 
    id: "02",
    hue: "white" 
  },
  { 
    title: "Cosmos", 
    author: "Carl Sagan", 
    quote: "The cosmos is within us. We are star-stuff. We are a way for the cosmos to know itself.", 
    id: "03",
    hue: "glass" 
  },
  { 
    title: "Beyond Good & Evil", 
    author: "Nietzsche", 
    quote: "He who fights with monsters might take care lest he thereby become a monster.", 
    id: "04",
    hue: "black" 
  },
];

export function BookSection() {
  const [index, setIndex] = useState(0);

  // Auto-play logic: Changes every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % curatedBooks.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="library" className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden bg-white dark:bg-[#050505] py-20 md:py-32">
      <SectionCornerMarks />
      <div className="px-4 md:px-8 max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">Live Reading Scroll</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-medium tracking-tight dark:text-white leading-[1.05]">
            Books I'm Reading <br />
            <span className="font-bold">& Personal</span> <br />
            <span className="text-gray-400 dark:text-gray-600 italic">Favourites.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
            A curated selection of the logic, philosophy, and cosmic wisdom that currently fuels my growth.
          </p>

          <div className="flex justify-center lg:justify-start gap-2 h-1 w-full max-w-[200px] overflow-hidden bg-gray-100 dark:bg-white/5 rounded-full">
            <motion.div 
              key={index}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="w-full h-full bg-black dark:bg-white"
            />
          </div>
        </div>

        {/* Right Content: Hyper-Realistic Portrait Stack */}
        <div className="flex-1 relative h-[550px] md:h-[650px] w-full max-w-[450px] flex items-center justify-center perspective-[3000px]">
          
          <AnimatePresence mode="popLayout">
            {[index, (index + 1) % curatedBooks.length, (index + 2) % curatedBooks.length].reverse().map((bookIdx, i) => {
              const book = curatedBooks[bookIdx];
              const reverseI = 2 - i; 
              const isFront = reverseI === 0;

              return (
                <motion.div
                  key={`${book.id}-${bookIdx}`}
                  initial={{ y: 50, opacity: 0, rotateX: 60 }}
                  animate={{ 
                    y: reverseI * -45, // Stack upwards vertically
                    zIndex: 10 - reverseI,
                    opacity: 1 - reverseI * 0.2,
                    scale: 1 - reverseI * 0.08,
                    rotateX: 43, 
                    rotateY: reverseI * 2, 
                    filter: reverseI === 0 ? "none" : `blur(${reverseI * 1.5}px)`
                  }}
                  exit={{ 
                    x: 400, 
                    y: -150, 
                    rotate: 15, 
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 1, ease: [0.23, 1, 0.32, 1] }
                  }}
                  transition={{ type: "spring", stiffness: 70, damping: 20 }}
                  className="absolute w-full aspect-[3/4]" // Proper Portrait Book Ratio
                >
                  {/* REAL 3D BOOK VOLUME (REDUCED CLIPPING) */}
                  <div className={`relative h-full w-full rounded-r-[15px] rounded-l-[35px] shadow-[20px_40px_100px_rgba(0,0,0,0.3)] dark:shadow-[30px_50px_120px_rgba(0,0,0,0.7)] border-t-[4px] border-l-[1px] transition-all duration-500 overflow-visible ${
                    book.hue === 'white' ? 'bg-[#fcfcfc] border-black/5' : 'bg-[#0a0a0a] border-white/5'
                  }`}>
                    
                    {/* LEFT SIDE: THE ROUNDED SPINE (WITH RIBBED TEXTURE) */}
                    <div className="absolute inset-y-[2px] -left-[32px] w-[35px] bg-[#1a1a1a] dark:bg-[#111] rounded-l-[40px] shadow-2xl flex flex-col justify-center items-center gap-10 overflow-hidden z-0 origin-right [transform:rotateY(-90deg)] border-l-[3px] border-white/5">
                        <div className="w-full h-[2px] bg-white/[0.05]" />
                        <div className="w-full h-[2px] bg-white/[0.05]" />
                        <div className="w-full h-[2px] bg-white/[0.05]" />
                    </div>

                    {/* RIGHT SIDE: THE PAGE STACK (VISIBLE VOLUME) */}
                    <div className="absolute inset-y-[4px] -right-[15px] w-[15px] bg-[#f0f0f0] dark:bg-[#111] rounded-r-[10px] shadow-inner border-r border-black/10 dark:border-white/5 flex flex-row gap-[1px] px-1 pointer-events-none origin-left [transform:rotateY(90deg)]">
                       {[...Array(6)].map((_, idx) => (
                          <div key={idx} className="h-full w-[1.5px] bg-black/[0.03] dark:bg-white/[0.03]" />
                       ))}
                    </div>

                    {/* SPINE TRANSITION (The "Gutter") */}
                    <div className="absolute left-[38px] top-0 bottom-0 w-[1px] bg-black/10 dark:bg-white/10 z-20 shadow-[0_0_15px_rgba(0,0,0,0.1)]" />
                    
                    {/* Front Decoration Strip (Spine face) */}
                    <div className="absolute left-0 top-0 bottom-0 w-[45px] bg-gradient-to-r from-black/20 via-transparent to-transparent z-10 rounded-l-[35px]" />

                    {/* Book Cover Content */}
                    <div className="absolute inset-0 p-8 md:p-12 pl-16 flex flex-col justify-between h-full bg-inherit rounded-r-[15px] rounded-l-[35px] overflow-hidden">
                       <div className="space-y-4">
                          <div className="flex items-center gap-3 mb-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${book.hue === 'white' ? 'bg-black/20' : 'bg-white/20'}`} />
                             <span className={`text-[10px] font-bold uppercase tracking-[0.5em] ${book.hue === 'white' ? 'text-gray-300' : 'text-gray-800'}`}>Lib Index 0{book.id}</span>
                          </div>
                          
                          <h3 className={`text-2xl md:text-5xl font-bold uppercase tracking-tighter leading-none ${book.hue === 'white' ? 'text-black' : 'text-white'}`}>
                            {book.title}
                          </h3>
                       </div>

                       {/* The Insight Quote */}
                       <motion.div 
                         animate={isFront ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                         className="space-y-6"
                       >
                          <p className={`text-base md:text-2xl font-serif italic font-medium leading-[1.6] ${book.hue === 'white' ? 'text-gray-700' : 'text-gray-300'}`}>
                            "{book.quote}"
                          </p>
                          <div className="flex items-center gap-4">
                             <p className={`text-[10px] font-bold uppercase tracking-[0.7em] ${book.hue === 'white' ? 'text-gray-300' : 'text-gray-700'}`}>
                               — {book.author}
                             </p>
                          </div>
                       </motion.div>

                       <div className={`absolute bottom-8 right-8 text-[12px] font-bold tracking-[0.4em] transform rotate-90 ${book.hue === 'white' ? 'text-black/5' : 'text-white/5'}`}>
                          ARCHIVE
                       </div>
                    </div>

                    {/* Designer Ribbon */}
                    <div className="absolute -top-[10px] left-1/3 w-4 h-[120px] bg-red-600/30 backdrop-blur-md shadow-xl opacity-40 rounded-b-md z-30" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
