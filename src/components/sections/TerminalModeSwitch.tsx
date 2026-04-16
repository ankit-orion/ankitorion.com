"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTerminalMode } from "@/lib/terminal-mode";
import { TerminalPortfolio } from "./TerminalPortfolio";

export function TerminalModeSwitch() {
  const { isTerminalMode } = useTerminalMode();

  return (
    <AnimatePresence>
      {isTerminalMode && (
        <motion.div
          key="terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <TerminalPortfolio />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
