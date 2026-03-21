import { ArrowRight } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";

export function MyStory() {
  return (
    <section id="my-story" className="relative w-full border-b border-black/[0.04] dark:border-white/10">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-4xl mx-auto flex flex-col items-center">
      <h2 className="text-4xl font-medium mb-12">
        My <span className="font-bold">Story</span>
      </h2>

      <div className="max-w-3xl text-center space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-12 md:mb-24 px-2">
        <p>
          I'm Ankit, A Full-Stack Web Developer who thrives on the intersection of logic and creativity. Originally from Patna, Bihar, I completed my B.Tech in Computer Science and Engineering from Lovely Professional University. My journey is fueled by a deep-seated curiosity for building systems that are both powerful and human-centric.
        </p>
      </div>

      <div className="relative w-full max-w-2xl h-[400px] md:h-[500px] flex justify-center items-center mb-16 md:mb-24 px-4 overflow-hidden md:overflow-visible">
        {/* Left Polaroid */}
        <div className="absolute md:left-[10%] -translate-x-12 md:-translate-x-0 rotate-[-6deg] z-10 w-[200px] md:w-[300px] bg-white dark:bg-[#111] p-3 md:p-4 pb-8 md:pb-12 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(255,255,255,0.03)] rounded-sm transform hover:rotate-[-3deg] hover:scale-105 transition duration-500 ease-out border border-black/5 dark:border-white/10">
          {/* Top Clip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 md:w-8 h-4 md:h-6 bg-gray-800 rounded-sm shadow-xl flex items-center justify-center">
             <div className="w-4 md:w-6 h-1 bg-gray-600 rounded-full"></div>
             {/* Clip arms */}
             <div className="absolute top-0.5 md:top-1 -left-1 md:-left-2 w-1 md:w-2 h-3 md:h-4 border-[1px] md:border-2 border-gray-400 rounded-l-full rotate-12"></div>
             <div className="absolute top-0.5 md:top-1 -right-1 md:-right-2 w-1 md:w-2 h-3 md:h-4 border-[1px] md:border-2 border-gray-400 rounded-r-full -rotate-12"></div>
          </div>
          <div className="w-full h-[200px] md:h-[300px] bg-gray-200 bg-[url('/portrait.png')] bg-cover bg-center filter grayscale contrast-125"></div>
        </div>

        {/* Right Polaroid */}
        <div className="absolute md:right-[10%] translate-x-12 md:translate-x-0 rotate-[6deg] z-20 w-[200px] md:w-[300px] bg-white dark:bg-[#111] p-3 md:p-4 pb-8 md:pb-12 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(255,255,255,0.03)] rounded-sm transform hover:rotate-[3deg] hover:scale-105 transition duration-500 ease-out border border-black/5 dark:border-white/10">
          {/* Top Clip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 md:w-8 h-4 md:h-6 bg-gray-800 rounded-sm shadow-xl flex items-center justify-center">
             <div className="w-4 md:w-6 h-1 bg-gray-600 rounded-full"></div>
             {/* Clip arms */}
             <div className="absolute top-0.5 md:top-1 -left-1 md:-left-2 w-1 md:w-2 h-3 md:h-4 border-[1px] md:border-2 border-gray-400 rounded-l-full rotate-12"></div>
             <div className="absolute top-0.5 md:top-1 -right-1 md:-right-2 w-1 md:w-2 h-3 md:h-4 border-[1px] md:border-2 border-gray-400 rounded-r-full -rotate-12"></div>
          </div>
          <div className="w-full h-[200px] md:h-[300px] bg-gray-200 bg-[url('/portrait.png')] bg-cover bg-center filter grayscale contrast-125"></div>
        </div>
      </div>

      <div className="max-w-3xl text-center space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-12 px-2">
        <p>
          Beyond the code, you'll often find me immersed in the profound pages of a philosophy book or gazing at the night sky, forever dreaming of the cosmos. I'm a die-hard cricket fan who finds as much strategy on the pitch as I do in a complex architecture.
        </p>
        <p>
          I believe that technology, much like the universe, is an infinite canvas of possibilities—and I'm here to build the tools that navigate it.
        </p>
      </div>

      <button className="bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium hover:bg-black dark:hover:bg-gray-200 transition flex items-center gap-2">
        Read About Me <ArrowRight className="w-4 h-4" />
      </button>
      </div>
    </section>
  );
}
