import { ArrowRight } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";

export function Contact() {
  return (
    <section id="contact" className="relative w-full border-b border-black/[0.04] dark:border-white/10">
      <SectionCornerMarks />
      <div className="py-16 md:py-24 px-4 md:px-8 max-w-5xl mx-auto flex flex-col sm:flex-row gap-12 sm:gap-24 items-center sm:items-start justify-between">
      
      <div className="flex-1 space-y-8">
        <div className="flex items-start gap-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] dark:text-white text-center sm:text-left w-full sm:w-auto">
            <span className="font-bold">Your Vision,</span> My Creation<br />
            Let's Bring It To Life
          </h2>
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-[#111] flex-shrink-0 hidden md:block border border-gray-100 dark:border-white/10">
             <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&fit=crop" alt="avatar" className="w-full h-full object-cover filter grayscale contrast-125" />
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl text-center sm:text-left">
          Doesn't Matter If You Do Not Understand Code Or Structure Of The Business Online. Just Share With Me Some Specific Things You Fancy Or You Would Want To Understand; Like Specific Competitor Strategies, Missing Points Or Features You Would Like To See To Build The App Better.
        </p>

        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/10">
          <h4 className="font-bold text-lg dark:text-white">Looking For Something Else?</h4>
          <p className="font-bold text-lg dark:text-gray-200">Feel Free To Share Your Idea</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Tell me the most exact possible info. and details of your request</p>
        </div>

        <a href="mailto:contact@ankitorion.com" className="inline-flex bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium hover:bg-black dark:hover:bg-gray-200 transition items-center gap-2 w-full sm:w-auto justify-center mt-6">
          Send a Message - contact@ankitorion.com <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </div>
      </div>
    </section>
  );
}
