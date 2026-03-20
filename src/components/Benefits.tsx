import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionCornerMarks } from "./GridLines";

export function Benefits() {
  return (
    <section className="relative w-full border-b border-black/[0.04] dark:border-white/10">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
          Get The Website You Want<br className="hidden md:block" />
          {' '}Without <span className="font-bold">The Headache</span>
        </h2>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-4 md:mt-8">My process stands different</p>
      </div>

      <div className="space-y-6 text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium mx-auto px-4 md:px-12">
        <p className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
          <span>I Don't Just Design Pretty Screens, I Build You A System That Connects Strategy And Business Objectives.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
          <span>I Map The Complete Action With You To Make Sure User Path To Your Final Goal Is Fluid As Well As Flawless.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
          <span>Less Meetings, More Execution. Don't Waste Time On Pointless Calls; We Move Fast To See Work On Screen.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
          <span>No Hidden Cost - I Give You Honest Time And Price To Scope Estimates Down To Exact Details.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
          <span>Save And Track / A Google Sheet Sync Assures You To See Real Time Work In Progress.</span>
        </p>
        <p className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
          <span>Stand Out Fast - Take The Fast Route - Avoid Stress And Waiting Months For A Website Build That Under-delivers When It Finally Launches.</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-16">
        <Link
          href="#contact"
          className="flex items-center gap-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-medium hover:bg-black dark:hover:bg-gray-200 transition text-sm"
        >
          <span>Book a Call</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="#pricing"
          className="px-6 py-3 rounded-full font-medium border border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/40 transition text-sm flex items-center gap-2"
        >
          View Pricing <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      </div>
    </section>
  );
}
