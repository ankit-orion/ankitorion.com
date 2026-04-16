"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Github, Twitter, Home as HomeIcon, TerminalSquare } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useTerminalMode } from "@/lib/terminal-mode";

const navLinks = [
  { name: "Services", href: "#services", sectionId: "services" },
  { name: "Projects", href: "#featured-projects", sectionId: "featured-projects" },
  { name: "Story", href: "#my-story", sectionId: "my-story" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const { isTerminalMode, toggle: toggleTerminal } = useTerminalMode();

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  // All hooks above — safe to early-return here
  if (isTerminalMode) return null;

  return (
    <>
      <div className="fixed top-4 md:top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
        <motion.nav 
          initial={{ y: 0 }}
          animate={{ y: visible ? 0 : -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="pointer-events-auto bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl p-1 md:p-1.5 rounded-full border border-black/10 dark:border-white/10 shadow-[0_2px_16px_rgba(0,0,0,0.06)] flex items-center gap-2 md:gap-3 w-full lg:w-max justify-between lg:justify-center mx-auto"
        >
          {/* Logo & Mobile Menu */}
          <div className="flex items-center justify-between lg:justify-start w-full lg:w-auto px-2 lg:px-0">
            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition flex-shrink-0 group">
              <span className="font-bold text-sm text-black dark:text-white flex items-center gap-1.5 whitespace-nowrap lg:pl-3">
                 <HomeIcon className="w-4 h-4 hidden lg:block" />
                 Ankit Orion
              </span>
            </Link>
            
            <div className="flex items-center gap-0.5 sm:gap-1 lg:hidden">
              <a
                href="https://github.com/ankit-orion"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white transition"
              >
                <Github className="w-[18px] h-[18px]" />
              </a>
              <a
                href="https://x.com/OrionAnkit"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 dark:hover:text-white transition"
              >
                <Twitter className="w-[18px] h-[18px]" />
              </a>
              <div className="flex items-center justify-center -ml-1">
                <ThemeToggle />
              </div>
              {/* Terminal mode toggle — mobile */}
              <button
                onClick={toggleTerminal}
                title={isTerminalMode ? "Exit terminal mode" : "Switch to terminal mode"}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <TerminalSquare className="w-[18px] h-[18px]" />
              </button>
              <div className="w-px h-5 bg-black/10 dark:bg-white/10 mx-1 sm:mx-2" />
              <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-5 bg-black/10 dark:bg-white/10" />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center gap-0.5">
             {navLinks.map((link) => {
               const isActive = link.sectionId ? activeSection === link.sectionId : activeSection === "";
               return (
               <Link
                 key={link.name}
                 href={link.href}
                 className={`text-xs font-semibold px-3 py-2 rounded-full transition whitespace-nowrap ${
                   isActive
                     ? "bg-black/5 dark:bg-white/10 text-black dark:text-white"
                     : "text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                 }`}
               >
                 {link.name}
               </Link>
             );
             })}
          </div>
  
          <div className="hidden lg:block w-[1px] h-5 bg-black/10 dark:bg-white/10" />

          {/* Socials */}
          <div className="hidden lg:flex items-center gap-1">
            <a
              href="https://github.com/ankit-orion"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://x.com/OrionAnkit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-[18px] h-[18px]" />
            </a>
          </div>

          <div className="hidden lg:block w-[1px] h-5 bg-black/10 dark:bg-white/10" />

          <div className="hidden lg:flex items-center justify-center px-1">
            <ThemeToggle />
          </div>

          <div className="hidden lg:block w-[1px] h-5 bg-black/10 dark:bg-white/10" />

          {/* Terminal mode toggle — desktop */}
          <button
            onClick={toggleTerminal}
            title={isTerminalMode ? "Exit terminal mode" : "Switch to terminal mode"}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition
              text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white
              hover:bg-black/5 dark:hover:bg-white/5"
          >
            <TerminalSquare className="w-[15px] h-[15px]" />
            <span>{isTerminalMode ? "Exit" : ">_"}</span>
          </button>

          <div className="hidden lg:block w-[1px] h-5 bg-black/10 dark:bg-white/10" />

          {/* Contact Button */}
          <Link
            href="#contact"
            className="hidden lg:flex bg-[#1a1a1a] dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-80 transition whitespace-nowrap border border-transparent dark:border-white/20"
          >
            Contact
          </Link>
        </motion.nav>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/95 dark:bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col p-6 sm:p-8 md:p-12 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-10 sm:mb-20">
               <span className="font-bold text-lg tracking-tighter dark:text-white">Ankit Orion</span>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="p-3 rounded-full bg-black/5 dark:bg-white/5 dark:text-white"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-5 sm:gap-8 flex-1">
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
                     className="text-2xl sx:text-3xl sm:text-4xl md:text-6xl font-bold dark:text-white tracking-tighter hover:text-gray-400 transition"
                   >
                     {link.name}
                   </Link>
                 </motion.div>
               ))}
            </div>

            {/* Drawer Footer */}
            <div className="pt-12 border-t border-black/5 dark:border-white/10 flex justify-end">
               <Link
                 href="#contact"
                 onClick={() => setIsOpen(false)}
                 className="text-sm font-semibold text-black dark:text-white border-b border-black dark:border-white pb-1"
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
