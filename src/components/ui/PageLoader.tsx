"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 bg-white dark:bg-black"
        >
          {/* Wordmark */}
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white"
          >
            Ankit Mishra
          </motion.span>

          {/* Three dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
