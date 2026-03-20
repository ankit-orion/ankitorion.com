import Link from "next/link";
import { Headphones } from "lucide-react";
import { SectionCornerMarks } from "./GridLines";

export function Hero() {
  return (
    <section className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-hidden">
      <SectionCornerMarks />
      <div className="min-h-screen pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mt-16 md:mt-0">
      <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-100/50 dark:border-green-800/50">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Available for Freelance
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium leading-[1.1] tracking-tight text-[#1a1a1a] dark:text-white">
          Designing Websites<br className="hidden md:block" />
          {' '}That Maximize<br className="hidden md:block" />
          {' '}<span className="text-[#1a1a1a]/80 dark:text-gray-400">Conversions.</span>
        </h1>

        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mx-auto md:mx-0">
          Hi, I'm Ankit—A Product Designer Specializing In Web And Mobile Apps For FinTech, ECommerce, And SaaS. I Create User-Centric Designs That Engage Audiences And Drive Conversions. Currently Based In India.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
          <Link
            href="#contact"
            className="flex items-center gap-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-black dark:hover:bg-gray-200 transition"
          >
            <span>Book a Call</span>
            <Headphones className="w-5 h-5" />
          </Link>
          <Link
            href="#pricing"
            className="px-6 py-3 rounded-full font-medium border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition"
          >
            View Pricing
          </Link>
        </div>
      </div>

      <div className="flex-1 relative w-full h-[400px] sm:h-[500px] md:h-[600px] flex justify-center md:justify-end mt-8 md:mt-0">
        {/* Container for the split portrait effect */}
        <div className="relative w-full max-w-[500px] h-full rounded-[30px] md:rounded-[40px] overflow-hidden bg-gray-100 dark:bg-[#111] flex items-center justify-center dark:border dark:border-white/10 dark:shadow-[0_0_80px_rgba(255,255,255,0.03)]">
          {/* Base Image Wrapper */}
          <div className="absolute inset-0">
             <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&fit=crop" alt="Portrait" className="w-full h-full object-cover filter grayscale contrast-125" />
          </div>
          
          {/* Frosted Glass Overlay Left Half */}
          <div className="absolute inset-y-0 left-0 w-[55%] backdrop-blur-xl bg-white/10 flex">
             {/* Staggered vertical strips to simulate the ribbed glass effect */}
             <div className="w-1/4 h-full bg-white/5 backdrop-blur-sm border-r border-white/10"></div>
             <div className="w-1/4 h-full bg-white/10 backdrop-blur-md border-r border-white/10"></div>
             <div className="w-1/4 h-full bg-white/10 backdrop-blur-lg border-r border-white/10"></div>
             <div className="w-1/4 h-full bg-black/5 backdrop-blur-xl border-r border-white/5"></div>
           </div>
        </div>
      </div>
      </div>
    </section>
  );
}
