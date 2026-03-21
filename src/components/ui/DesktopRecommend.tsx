"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, X } from "lucide-react";

export function DesktopRecommend() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check if user is on mobile/tablet (Desktop is usually 1024px+)
    const isMobile = window.innerWidth < 1024;
    
    // 2. Check if user has already seen/dismissed this
    const hasSeen = localStorage.getItem("desktop-recommend-seen");

    if (isMobile && !hasSeen) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("desktop-recommend-seen", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, x: "-50%", opacity: 0 }}
          animate={{ y: 20, x: "-50%", opacity: 1 }}
          exit={{ y: -100, x: "-50%", opacity: 0 }}
          className="fixed top-0 left-1/2 -ms-px z-[100] w-[90%] max-w-md"
        >
          <div className="relative overflow-hidden bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center gap-4">
            
            {/* Animated Glow behind the icon */}
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
            
            <div className="w-12 h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-shrink-0">
               <Monitor className="w-6 h-6 animate-bounce [animation-duration:2s]" />
            </div>

            <div className="flex-1 pr-6">
               <p className="text-sm dark:text-white font-medium leading-relaxed">
                  Open this website on a desktop for a better experience.
               </p>
            </div>

            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
