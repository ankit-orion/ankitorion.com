import { SectionCornerMarks } from "@/components/ui/GridLines";
import { Globe, Code2, Cpu, Database, Layers, Sparkles, Zap, Smartphone, Terminal, Layout } from "lucide-react";

const skills = [
  { name: "Next.js", icon: Globe },
  { name: "React", icon: Layers },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Sparkles },
  { name: "Node.js", icon: Cpu },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Framer Motion", icon: Zap },
  { name: "Mobile Design", icon: Smartphone },
  { name: "System Design", icon: Layout },
  { name: "Backend", icon: Terminal },
];

export function LogoTicker() {
  return (
    <section className="relative w-full bg-white dark:bg-transparent overflow-hidden border-b border-black/[0.12] dark:border-white/20">
      <SectionCornerMarks />
      <div className="w-full overflow-hidden py-16">
        <div className="flex flex-col items-center mb-10 text-center">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-gray-500 dark:text-gray-500 mb-4 ml-[0.5em]">
            Expertise
          </span>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tighter dark:text-white">
            The <span className="text-gray-400 dark:text-gray-500 font-medium italic">Toolkit.</span>
          </h3>
        </div>

        <div className="max-w-5xl mx-auto relative px-4 md:px-8">
          <div className="overflow-hidden mask-image-gradient">
            <div className="flex gap-16 items-center animate-slide whitespace-nowrap py-4">
              {[...skills, ...skills, ...skills].map((skill, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-300 group">
                  <skill.icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-bold text-sm md:text-base uppercase tracking-[0.2em] font-outfit">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
