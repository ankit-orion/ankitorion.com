"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Instagram, X as XIcon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#featured-projects" }, // Need to sync with section id
  { name: "Library", href: "#library" },
  { name: "Story", href: "#my-story" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl px-4 md:px-6 py-2 md:py-3 rounded-full border border-black/5 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] flex items-center gap-3 md:gap-6 w-[95%] sm:w-auto max-w-2xl justify-between sm:justify-center">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 hover:scale-105 transition flex-shrink-0 group">
          <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
             <span className="text-white dark:text-black font-bold text-xs">A.</span>
          </div>
          <span className="font-bold text-sm text-black dark:text-white hidden sm:block tracking-tight">Ankit Orion</span>
        </Link>
        
        {/* Restored Social Icons (Previous Style) */}
        <div className="hidden sm:flex items-center gap-4 text-gray-500 dark:text-gray-400 border-l border-r px-6 border-black/5 dark:border-white/10 mx-2">
          <Link href="#" className="hover:text-black dark:hover:text-white transition group">
            <XIcon className="w-4 h-4 group-hover:scale-110 transition" />
          </Link>
          <Link href="#" className="hover:text-black dark:hover:text-white transition group">
            <Instagram className="w-4 h-4 group-hover:scale-110 transition" />
          </Link>
          <Link href="#" className="hover:text-black dark:hover:text-white transition group">
            <Copy className="w-4 h-4 group-hover:scale-110 transition" />
          </Link>
        </div>

        {/* Right Section (Theme Toggle + CTA) */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <ThemeToggle />
          
          <Link
            href="#contact"
            className="hidden sm:block bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black dark:hover:bg-gray-200 transition text-center shadow-lg"
          >
            Book Now
          </Link>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/95 dark:bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col p-8 md:p-12"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-20">
               <span className="font-bold text-lg tracking-tighter dark:text-white">Ankit Orion</span>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="p-3 rounded-full bg-black/5 dark:bg-white/5 dark:text-white"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            {/* Navigation Pile */}
            <div className="flex flex-col gap-8 flex-1">
               {navLinks.map((link, idx) => (
                 <motion.div
                   key={link.name}
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: idx * 0.1 }}
                 >
                   <Link 
                     href={link.href} 
                     onClick={() => setIsOpen(false)}
                     className="text-4xl md:text-6xl font-bold dark:text-white tracking-tighter hover:text-gray-400 transition"
                   >
                     {link.name}
                   </Link>
                 </motion.div>
               ))}
            </div>

            {/* Social Links Footer */}
            <div className="pt-12 border-t border-black/5 dark:border-white/10 flex justify-between items-center">
               <div className="flex gap-6">
                  <Link href="#" className="dark:text-white"><XIcon className="w-6 h-6" /></Link>
                  <Link href="#" className="dark:text-white"><Instagram className="w-6 h-6" /></Link>
                  <Link href="#" className="dark:text-white"><Copy className="w-6 h-6" /></Link>
               </div>
               <Link 
                 href="#contact" 
                 onClick={() => setIsOpen(false)}
                 className="text-sm font-bold uppercase tracking-[0.2em] dark:text-white border-b border-black dark:border-white pb-1"
               >
                 Get in Touch
               </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
