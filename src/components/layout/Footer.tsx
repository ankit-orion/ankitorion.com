import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="pt-24 pb-12 px-4 md:px-8 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 text-center md:text-left">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter dark:text-white">
              ANKIT ORION<span className="text-blue-600">.</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto md:mx-0 text-base md:text-lg leading-relaxed">
              Crafting world-class digital experiences for ambitious startups and global brands.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-5">
              <Link href="#" className="p-3 bg-gray-50 dark:bg-[#111] dark:text-white dark:border dark:border-white/10 rounded-2xl hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 bg-gray-50 dark:bg-[#111] dark:text-white dark:border dark:border-white/10 rounded-2xl hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 bg-gray-50 dark:bg-[#111] dark:text-white dark:border dark:border-white/10 rounded-2xl hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 bg-gray-50 dark:bg-[#111] dark:text-white dark:border dark:border-white/10 rounded-2xl hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 dark:text-gray-500">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="#services" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center justify-center md:justify-start gap-1 group">Services <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" /></Link></li>
              <li><Link href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center justify-center md:justify-start gap-1 group">Projects <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" /></Link></li>
              <li><Link href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center justify-center md:justify-start gap-1 group">Pricing <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" /></Link></li>
              <li><Link href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center justify-center md:justify-start gap-1 group">Contact <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5" /></Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-gray-400 dark:text-gray-500">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-100 dark:border-white/10 text-sm text-gray-400 dark:text-gray-600 gap-4">
          <p>© {currentYear} Ankit Orion. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with ✨ and Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
