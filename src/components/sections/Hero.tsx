import Link from "next/link";
import { Headphones } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";

export function Hero() {
  return (
    <section className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden">
      <SectionCornerMarks />
      <div className="min-h-[100dvh] pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left order-2 md:order-1">
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-100/50 dark:border-green-800/50">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Available for Freelance
        </div>
        
        <h1 className="text-4xl md:text-7xl lg:text-[80px] font-medium leading-[1.1] tracking-tight text-[#1a1a1a] dark:text-white">
          Building Digital<br className="hidden md:block" />
          {' '}Universes In Search<br className="hidden md:block" />
          {' '}<span className="text-[#1a1a1a]/80 dark:text-gray-400">Of The Infinite.</span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mx-auto md:mx-0">
          Hi, I'm Ankit—A Full-Stack Web Developer from Patna, Bihar. I specialize in building robust, high-performance web applications that merge technical excellence with seamless user experiences. B.Tech CSE Graduate from LPU.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
          <Link
            href="#contact"
            className="flex items-center gap-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium hover:bg-black dark:hover:bg-gray-200 transition"
          >
            <span>Book a Call</span>
            <Headphones className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[400px] sm:h-[500px] md:flex-1 md:h-[600px] flex justify-center md:justify-end order-1 md:order-2 flex-shrink-0">
        {/* Container for the split portrait effect */}
        <div className="relative w-full max-w-[400px] md:max-w-[500px] h-full rounded-[30px] md:rounded-[40px] overflow-hidden bg-gray-100 dark:bg-[#111] flex items-center justify-center dark:border dark:border-white/10 dark:shadow-[0_0_80px_rgba(255,255,255,0.03)] opacity-100 block">
          {/* Base Image Wrapper */}
          <div className="absolute inset-0">
             <img src="/portrait.png" alt="Portrait" className="w-full h-full object-cover filter grayscale contrast-125" />
          </div>
          
          {/* Centered Frosted Glass Overlay */}
          <div className="absolute inset-y-0 right-0 w-1/2 backdrop-blur-xl bg-transparent flex">
             {/* Staggered vertical strips to simulate the ribbed glass effect */}
             <div className="w-1/4 h-full bg-white/[0.01] backdrop-blur-[2px] border-l border-white/[0.05]"></div>
             <div className="w-1/4 h-full bg-white/[0.02] backdrop-blur-[4px] border-l border-white/[0.05]"></div>
             <div className="w-1/4 h-full bg-white/[0.03] backdrop-blur-[8px] border-l border-white/[0.05]"></div>
             <div className="w-1/4 h-full bg-black/[0.01] backdrop-blur-[12px] border-l border-white/[0.02]"></div>
           </div>
        </div>
      </div>
      </div>
    </section>
  );
}
