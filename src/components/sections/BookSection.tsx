"use client";

import { motion } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";

const libraryBooks = [
  { 
    title: "Meditations", 
    author: "Marcus Aurelius", 
    quote: "The happiness of your life depends upon the quality of your thoughts.", 
    id: "01" 
  },
  { 
    title: "The Republic", 
    author: "Plato", 
    quote: "Philosophy begins in wonder. Knowledge is the food of the soul.", 
    id: "02" 
  },
  { 
    title: "Cosmos", 
    author: "Carl Sagan", 
    quote: "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself.", 
    id: "03" 
  },
  { 
    title: "Beyond Good & Evil", 
    author: "Nietzsche", 
    quote: "He who fights with monsters might take care lest he thereby become a monster.", 
    id: "04" 
  },
];

export function BookSection() {
  return (
    <section id="library" className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden bg-white dark:bg-[#050505] py-20 md:py-32">
      <SectionCornerMarks />
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 dark:text-white">
            Books I'm Reading <br />
            & Personal <span className="font-bold">Favourites.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed font-medium">
            A curated selection of the logic, philosophy, and cosmic wisdom that currently fuels my growth and curiosity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 perspective-[3000px]">
          {libraryBooks.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="relative group h-[480px] w-full"
            >
              {/* 3D BOOK BODY */}
              <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:rotate-y-[-10deg]">
                
                {/* 1. INTERNAL PAGE (A High-End Bibliographic Card) */}
                <div className="absolute inset-0 bg-white dark:bg-[#0c0c0c] rounded-[24px] p-8 md:p-10 border border-black/[0.05] dark:border-white/[0.05] shadow-[0_30px_100px_rgba(0,0,0,0.1)] dark:shadow-none flex flex-col justify-between overflow-hidden">
                   {/* Minimal Grid Background */}
                   <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

                   <div className="space-y-4 relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 dark:text-gray-700">Archival Insight</span>
                      <h3 className="text-2xl font-bold dark:text-white uppercase leading-tight tracking-tighter">
                        {book.title}
                      </h3>
                      <div className="w-8 h-[1px] bg-black/10 dark:bg-white/10" />
                   </div>

                   <p className="text-base md:text-lg italic text-gray-600 dark:text-gray-300 font-medium leading-[1.7] relative z-10 tracking-tight">
                     "{book.quote}"
                   </p>

                   <div className="pt-6 border-t border-black/5 dark:border-white/5 relative z-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600">
                        — {book.author}
                      </p>
                   </div>
                </div>

                {/* 2. FROSTED GLASS COVER (ANIMATED) */}
                <motion.div 
                  initial={{ rotateY: 0 }}
                  whileHover={{ rotateY: -115 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 70, // Slower, more elegant
                    damping: 20, 
                    mass: 1.2
                  }}
                  style={{ transformOrigin: "left center" }}
                  className="absolute inset-0 bg-white/60 dark:bg-white/[0.01] backdrop-blur-3xl rounded-[24px] p-8 md:p-10 z-20 shadow-xl border-l-[4px] border-white/80 dark:border-white/20 flex flex-col justify-between"
                >
                   {/* Ribbed Pattern (Hero-consistent) */}
                   <div className="absolute inset-y-0 right-0 w-1/2 flex pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                      <div className="w-1/4 h-full border-l border-white/10 dark:border-black/10" />
                      <div className="w-1/4 h-full border-l border-white/5 dark:border-black/5" />
                      <div className="w-1/4 h-full border-l border-white/10 dark:border-black/10" />
                      <div className="w-1/4 h-full border-l border-white/5 dark:border-black/5" />
                   </div>

                   <div className="space-y-4 relative z-10">
                       <span className="text-[10px] uppercase font-bold tracking-[0.6em] text-gray-500 dark:text-gray-600 group-hover:opacity-10 transition-opacity">Archive File</span>
                       <div className="w-12 h-[1px] bg-gray-400 dark:bg-white/20 group-hover:opacity-10 transition-opacity" />
                   </div>

                   <h3 className="text-2xl font-bold text-black dark:text-white uppercase leading-tight tracking-tighter opacity-80 group-hover:opacity-10 transition-opacity relative z-10">
                     {book.title}
                   </h3>

                   <div className="pt-6 border-t border-black/5 dark:border-white/10 relative z-10 group-hover:opacity-10 transition-opacity">
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600">
                        Vol IX / Infinite Sync
                      </p>
                   </div>
                </motion.div>

                {/* 3. SPINE EDGE DETAIL */}
                <div className="absolute -left-2 top-4 bottom-4 w-2 bg-gray-100 dark:bg-white/10 rounded-l-full z-10 shadow-lg" />
              </div>

              {/* AMBIENT GLOW (DARK MODE OPTIMIZED) */}
              <div className="absolute -bottom-12 left-0 right-0 h-10 bg-black/5 dark:bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
