import Link from "next/link";
import { Copy, Instagram, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-100 dark:border-white/10 shadow-sm flex items-center gap-3 md:gap-6 w-[95%] sm:w-auto max-w-lg justify-between sm:justify-center">
      <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition flex-shrink-0">
        <span className="font-medium text-sm text-black dark:text-white hidden sm:block">Home</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-black dark:text-white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </Link>
      
      <div className="hidden sm:flex items-center gap-4 text-gray-600 dark:text-gray-400 border-l border-r px-4 border-gray-200 dark:border-white/10">
        <Link href="#" className="hover:text-black dark:hover:text-white transition">
          <X className="w-4 h-4" />
        </Link>
        <Link href="#" className="hover:text-black dark:hover:text-white transition">
          <Instagram className="w-4 h-4" />
        </Link>
        <Link href="#" className="hover:text-black dark:hover:text-white transition">
          <Copy className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <ThemeToggle />
        <Link
          href="#contact"
          className="bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-black dark:hover:bg-gray-200 transition text-center"
        >
          Book a Call
        </Link>
      </div>
    </nav>
  );
}
