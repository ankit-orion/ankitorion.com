import { SectionCornerMarks } from "@/components/ui/GridLines";

export function LogoTicker() {
  const logos = [
    "Logipad", "STUDIOTRAVEL", "EYKKON", "Chick-fil-A", "kapa99", "sbox"
  ];

  return (
    <section className="relative w-full border-b border-black/[0.04] dark:border-white/10 bg-white dark:bg-transparent">
      <SectionCornerMarks />
      <div className="w-full overflow-hidden py-10">
      <div className="flex gap-24 items-center animate-slide whitespace-nowrap px-8 mask-image-gradient">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <span key={index} className="text-gray-400 font-bold text-xl uppercase tracking-wider flex-shrink-0">
            {logo}
          </span>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
      </div>
    </section>
  );
}
