"use client";

import Link from "next/link";
import { Headphones } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";
import { motion } from "framer-motion";

export function Hero() {
  const bioText = "Hi, I'm Ankit — a software engineer from Patna, Bihar. I spend my time building software, solving problems, and understanding how systems work, both in code and beyond it. I'm deeply interested in space science and philosophy, constantly exploring ideas about the universe, logic, and human thinking.";

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.025, 
        delayChildren: 0 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.01,
      },
    },
    hidden: {
      opacity: 0,
    },
  };


  return (
    <section className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden bg-white dark:bg-black">
      <SectionCornerMarks />
      <div className="min-h-[100dvh] pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-8 md:space-y-10 text-left order-2 md:order-1 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#dcffca] text-[#2c5300] px-4 py-2 rounded-full text-sm font-medium border border-black/5">
            <div className="w-2 h-2 rounded-full bg-[#46A200] animate-pulse" />
            Available for Freelance
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold leading-[1.1] tracking-tight text-[#1a1a1a] dark:text-white">
            Code First.
            <br />
            Everything Else
            <br />
            <span className="text-black/40 dark:text-gray-500">Follows.</span>
          </h1>

          <motion.p 
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed font-handwriting min-h-[140px]"
          >
            {bioText.split("").map((char, index) => (
              <motion.span key={index} variants={child}>
                {char}
              </motion.span>
            ))}
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#contact"
              className="flex items-center gap-3 bg-[#111] dark:bg-white text-white dark:text-black px-8 py-5 rounded-full font-bold hover:bg-black dark:hover:bg-gray-100 transition shadow-xl"
            >
              <span>Book a Call</span>
              <Headphones className="w-5 h-5" />
            </Link>
            <Link
              href="#pricing"
              className="px-8 py-5 rounded-full font-bold border-2 border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition text-[#1a1a1a] dark:text-white bg-white/50 dark:bg-black/50 backdrop-blur-sm"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div className="relative w-full h-[450px] sm:h-[600px] md:flex-[1.4] md:h-[750px] flex justify-center md:justify-end order-1 md:order-2">
          {/* Main Portrait Container */}
          <div className="relative w-full max-w-[450px] md:max-w-none h-full rounded-[40px] md:rounded-[60px] overflow-hidden bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center border border-black/5 dark:border-white/5 shadow-2xl">
            {/* The base portrait image */}
            <div className="absolute inset-0">
              <img
                src="/portrait.png"
                alt="Portrait"
                className="w-full h-full object-cover filter grayscale contrast-[1.1] scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none"></div>
            </div>

            {/* Split "Ribbed Glass" Effect Overlay */}
            <div className="absolute inset-y-0 right-0 w-1/2 flex h-full">
              {/* This mimics the vertical striping seen in the screenshot */}
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-full flex-1 backdrop-blur-[24px] bg-white/[0.03] dark:bg-black/[0.1] border-l border-white/[0.08] dark:border-white/[0.02]"
                  style={{
                    backdropFilter: `blur(${10 + i * 4}px)`,
                    opacity: 0.8 + i * 0.02,
                  }}
                />
              ))}
            </div>

            {/* Subtle outer corners decoration */}
            <div className="absolute top-8 left-8 w-12 h-[1px] bg-white/20" />
            <div className="absolute top-8 left-8 w-[1px] h-12 bg-white/20" />
            <div className="absolute bottom-8 right-8 w-12 h-[1px] bg-white/20 rotate-180" />
            <div className="absolute bottom-8 right-8 w-[1px] h-12 bg-white/20 rotate-180" />
          </div>
        </div>
      </div>
    </section>
  );
}
