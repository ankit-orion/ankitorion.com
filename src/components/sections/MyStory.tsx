"use client";

import { ArrowRight, BookOpen, Star, Cpu } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";

const interests = [
  { icon: BookOpen, label: "Philosophy" },
  { icon: Star,     label: "Cosmos" },
  { icon: Cpu,      label: "Cricket" },
];

export function MyStory() {
  return (
    <section id="my-story" className="relative w-full">
      <SectionCornerMarks />

      <div className="py-20 md:py-32 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-6xl mx-auto">

        {/* Label */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
          About me
        </p>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-start">

          {/* Left — photo */}
          <div className="w-full lg:w-[42%] shrink-0">
            <div className="relative">
              {/* Main photo */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#111]">
                <div className="w-full h-full bg-[url('/portrait.png')] bg-cover bg-center" />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating tag — name + university */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white dark:bg-[#111] border border-black/8 dark:border-white/10 rounded-xl px-4 py-3 shadow-xl">
                <p className="text-xs font-bold text-black dark:text-white leading-tight">Ankit Mishra</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight mt-0.5">B.Tech · CSE · LPU</p>
              </div>

              {/* Interests pills */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 flex flex-col gap-2">
                {interests.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-white dark:bg-[#111] border border-black/8 dark:border-white/10 rounded-full px-3 py-1.5 shadow-md"
                  >
                    <Icon className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                    <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — text */}
          <div className="flex-1 flex flex-col justify-center pt-6 lg:pt-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-gray-900 dark:text-gray-100 mb-8 leading-[1.1]">
              My <span className="font-bold italic">Story</span>
            </h2>

            <div className="space-y-5 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
              <p>
                I'm Ankit, a Full-Stack Web Developer who thrives on the intersection of logic
                and creativity. Originally from <span className="text-gray-900 dark:text-gray-100 font-medium">Patna, Bihar</span>, I completed my B.Tech in
                Computer Science and Engineering from Lovely Professional University. My journey
                is fueled by a deep-seated curiosity for building systems that are both
                powerful and human-centric.
              </p>
              <p>
                Beyond the code, you'll often find me immersed in the profound pages of a
                philosophy book or gazing at the night sky, forever dreaming of the cosmos.
                I'm a die-hard <span className="text-gray-900 dark:text-gray-100 font-medium">cricket</span> fan who finds as much strategy on the pitch as I
                do in a complex architecture.
              </p>
              <p>
                I believe that technology, much like the universe, is an infinite canvas of
                possibilities — and I'm here to build the tools that navigate it.
              </p>
            </div>

            {/* Divider */}
            <div className="my-8 h-px bg-black/8 dark:bg-white/8" />

            {/* Origin badge + CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium text-sm hover:opacity-80 transition-opacity">
                Read About Me <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-widest">
                Patna, Bihar · India
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
