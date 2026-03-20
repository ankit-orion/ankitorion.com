import { ArrowRight } from "lucide-react";
import { SectionCornerMarks } from "./GridLines";

export function MyStory() {
  return (
    <section className="relative w-full border-b border-black/[0.04] dark:border-white/10">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
      <h2 className="text-4xl font-medium mb-12">
        My <span className="font-bold">Story</span>
      </h2>

      <div className="max-w-3xl text-center space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-12 md:mb-24 px-2">
        <p>
          I'm Ankit, A Strategic And User-Focused Product Designer With 10+ Years Of Experience. Passionate About Solving User And Product Challenges, I Leverage Design To Help Companies Meet Their Business Goals. Analytical, Results-Driven, And Highly Collaborative, I Excel At Crafting Intuitive Experiences That Drive Success.
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
          <div className="w-full h-[200px] md:h-[300px] bg-gray-200 bg-[url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&fit=crop&auto=format')] bg-cover bg-center filter grayscale contrast-125"></div>
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
          <div className="w-full h-[200px] md:h-[300px] bg-gray-200 bg-[url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&fit=crop&auto=format')] bg-cover bg-center filter grayscale contrast-125"></div>
        </div>
      </div>

      <div className="max-w-3xl text-center space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-12 px-2">
        <p>
          As Always Learning — Honing My Skills, Brought To Life Through <br />
          Experience. To Name The Few - Emerging Startups, B2B SaaS <br />
          Brands, Marketing Agencies And Many More.
        </p>
        <p>
          In My Free Time, I Love Solo Adventures — Especially Long Highway <br />
          Rides And Sitting Through The Night To See The Sunrise.
        </p>
      </div>

      <button className="bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium hover:bg-black dark:hover:bg-gray-200 transition flex items-center gap-2">
        Read About Me <ArrowRight className="w-4 h-4" />
      </button>
      </div>
    </section>
  );
}
