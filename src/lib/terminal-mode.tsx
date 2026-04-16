"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

  // Persist preference across page refreshes
  useEffect(() => {
    const saved = localStorage.getItem("terminal-mode");
    if (saved === "true") setIsTerminalMode(true);
  }, []);

  const toggle = () => {
    setIsTerminalMode((prev) => {
      localStorage.setItem("terminal-mode", String(!prev));
      return !prev;
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
