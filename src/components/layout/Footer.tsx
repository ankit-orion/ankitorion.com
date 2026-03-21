import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#050505] py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Minimal Brand Label */}
        <div className="flex items-center gap-4">
           <span className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600">
             © {currentYear} Ankit Orion
           </span>
           <div className="hidden md:block w-px h-3 bg-black/5 dark:bg-white/10" />
           <p className="hidden md:block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 dark:text-gray-800">
             Architecting Digital Futures
           </p>
        </div>

        {/* Right: Social Minimal Icons */}
        <div className="flex items-center gap-2">
           <Link href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition">
             <Twitter className="w-4 h-4" />
           </Link>
           <Link href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition">
             <Instagram className="w-4 h-4" />
           </Link>
           <Link href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition">
             <Linkedin className="w-4 h-4" />
           </Link>
           <Link href="#" className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition">
             <Github className="w-4 h-4" />
           </Link>
        </div>

        {/* Floating Credit (Minimal) */}
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 dark:text-gray-800">
          Built in Bihar, Driven by Logic
        </div>
      </div>
    </footer>
  );
}
