import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";

export function Benefits() {
  return (
    <section className="relative w-full">
      <SectionCornerMarks />
      <div className="py-20 md:py-32 px-4 md:px-8 max-w-4xl mx-auto font-handwriting">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black dark:text-white">
            Things I Probably <span className="italic opacity-60">Shouldn&rsquo;t Admit</span>
          </h2>
          <div className="h-1 w-20 bg-black/10 dark:bg-white/10 mx-auto rounded-full" />
        </div>

        <div className="space-y-6 text-xl md:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium mx-auto px-4 md:px-12 list-none text-center md:text-left">
          <p className="hover:scale-[1.02] transition-transform cursor-default">&bull; I push to production on Fridays. </p>
          <p className="hover:scale-[1.02] transition-transform cursor-default">&bull; I believe I&rsquo;ll fix my sleep schedule &ldquo;from tomorrow.&rdquo; </p>
          <p className="hover:scale-[1.02] transition-transform cursor-default">&bull; I enjoy silence more than unnecessary conversations. </p>
          <p className="hover:scale-[1.02] transition-transform cursor-default">&bull; I question everything, including my own code. </p>
          <p className="hover:scale-[1.02] transition-transform cursor-default">&bull; I barely survived engineering, didn&rsquo;t fail a single subject, still don&rsquo;t know how. </p>
          <p className="hover:scale-[1.02] transition-transform cursor-default">&bull; I believe in fuck around and find out. </p>
        </div>
      </div>
    </section>
  );
}
