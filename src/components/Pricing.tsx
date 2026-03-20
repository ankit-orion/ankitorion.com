import { ArrowRight, Check } from "lucide-react";
import { SectionCornerMarks } from "./GridLines";

export function Pricing() {
  const categories = ["Web And App Ui", "Webflow", "Premium", "Consultation", "Wireframing"];

  return (
    <section id="pricing" className="relative w-full border-b border-black/[0.04] dark:border-white/10">
      <SectionCornerMarks />
      <div className="py-16 md:py-24 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-medium mb-8">
          What Can I <span className="font-bold">Serve You?</span>
        </h2>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition ${
                i === 0 
                ? "bg-[#1a1a1a] dark:bg-white text-white dark:text-black" 
                : "bg-gray-100/50 dark:bg-gray-800/20 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch pt-12 border-t border-gray-100 dark:border-white/10">
        {/* Left Card */}
        <div className="bg-gray-50/80 dark:bg-[#181818]/80 dark:backdrop-blur-xl rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-white/10 dark:shadow-[0_0_40px_rgba(255,255,255,0.02)] h-full flex flex-col">
          <div className="w-12 h-12 bg-white dark:bg-[#1e1e1e] text-black dark:text-white rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex items-center justify-center mb-8">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          
          <h3 className="text-xl font-bold mb-3 dark:text-white">Landing Page (Figma To Webflow)</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Your custom website carefully crafted visually with high conversion rate built mind frame.
          </p>

          <div className="mb-6 md:mb-8">
            <span className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white">457$</span>
            <span className="text-gray-400 dark:text-gray-500 block mt-1 md:mt-2 text-xs sm:text-sm font-medium">Fixed Price Project, limited</span>
          </div>

          <button className="w-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black py-3 md:py-4 rounded-full text-sm sm:text-base font-medium flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gray-200 transition mb-8 md:mb-10">
            Book A Call <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-4 mb-10 flex-1">
            {["Full customizable", "5 pages flow", "Project management", "Priority response maintenance", "Basic guide on webflow", "Estimated 3-5 days handover"].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200/60 dark:border-white/10">
            <p className="text-xs text-gray-400 font-medium mb-1">Estimated Delivery</p>
            <p className="text-sm font-bold text-gray-800 dark:text-white">2 to 3 days delivery</p>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-gray-50/80 dark:bg-[#181818]/80 dark:backdrop-blur-xl rounded-[30px] md:rounded-[40px] p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-white/10 dark:shadow-[0_0_40px_rgba(255,255,255,0.02)] h-full flex flex-col">
          <div className="w-12 h-12 bg-white dark:bg-[#1e1e1e] text-black dark:text-white rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex items-center justify-center mb-8">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          
          <h3 className="text-xl font-bold mb-3 dark:text-white">Full Website (Figma To Webflow)</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Full brand identity translation and conversion architecture for product showcasing. Tailored exactly to match your business scale.
          </p>

          <div className="mb-6 md:mb-8">
            <span className="text-4xl md:text-5xl font-bold tracking-tight dark:text-white">3597$</span>
            <span className="text-gray-400 dark:text-gray-500 block mt-1 md:mt-2 text-xs sm:text-sm font-medium">Fixed Price Project</span>
          </div>

          <button className="w-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black py-3 md:py-4 rounded-full text-sm sm:text-base font-medium flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-gray-200 transition mb-8 md:mb-10">
            Book A Call <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-4 mb-10 flex-1">
            {["Full Platform", "Up to 15 Pages structure", "All Features included", "High Conversion Architecture", "One month free support", "Complete Handover"].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200/60 dark:border-white/10">
            <p className="text-xs text-gray-400 font-medium mb-1">Estimated Delivery</p>
            <p className="text-sm font-bold text-gray-800 dark:text-white">2 weeks delivery</p>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
