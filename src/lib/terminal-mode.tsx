"use client";

import { createContext, useContext, useEffect, useState, useTransition } from "react";

type TerminalModeContextType = {
  isTerminalMode: boolean;
  toggle: () => void;
};

const TerminalModeContext = createContext<TerminalModeContextType>({
  isTerminalMode: false,
  toggle: () => {},
});

export function TerminalModeProvider({ children }: { children: React.ReactNode }) {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const saved = localStorage.getItem("terminal-mode");
    if (saved === "true") setIsTerminalMode(true);
  }, []);

  const toggle = () => {
    startTransition(() => {
      setIsTerminalMode((prev) => {
        localStorage.setItem("terminal-mode", String(!prev));
        return !prev;
      });
    });
  };

  return (
    <TerminalModeContext.Provider value={{ isTerminalMode, toggle }}>
      {children}
    </TerminalModeContext.Provider>
  );
}

export function useTerminalMode() {
  return useContext(TerminalModeContext);
}
