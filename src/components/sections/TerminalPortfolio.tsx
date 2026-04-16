"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTerminalMode } from "@/lib/terminal-mode";

// ─── Types ────────────────────────────────────────────────────────────────────
type Line =
  | { kind: "blank" }
  | { kind: "boot";    text: string }
  | { kind: "prompt";  cmd: string }
  | { kind: "output";  text: string }
  | { kind: "info";    text: string }
  | { kind: "success"; text: string }
  | { kind: "error";   text: string }
  | { kind: "divider" };

const PROMPT_PATH = "C:\\Users\\Ankit\\Portfolio";
const PROMPT      = `${PROMPT_PATH}>`;

// ─── Command outputs ──────────────────────────────────────────────────────────
const HELP: Line[] = [
  { kind: "output",  text: "The following commands are available:" },
  { kind: "blank" },
  { kind: "info",    text: "  WHOAMI    ........  Who is Ankit?" },
  { kind: "info",    text: "  ABOUT     ........  Background & story" },
  { kind: "info",    text: "  SKILLS    ........  Full tech stack" },
  { kind: "info",    text: "  PROJECTS  ........  Featured work" },
  { kind: "info",    text: "  CONTACT   ........  Get in touch" },
  { kind: "info",    text: "  GITHUB    ........  Open GitHub profile" },
  { kind: "info",    text: "  DIR       ........  List sections" },
  { kind: "info",    text: "  CLS       ........  Clear screen" },
  { kind: "info",    text: "  EXIT      ........  Return to portfolio" },
  { kind: "blank" },
];

const WHOAMI: Line[] = [
  { kind: "output",  text: "ankit-mishra" },
  { kind: "blank" },
  { kind: "output",  text: "Ankit Mishra (Ankit Orion)" },
  { kind: "output",  text: "Full-Stack Web Developer" },
  { kind: "output",  text: "Patna, Bihar, India" },
  { kind: "blank" },
];

const ABOUT: Line[] = [
  { kind: "blank" },
  { kind: "divider" },
  { kind: "info",    text: "  Name        :  Ankit Mishra" },
  { kind: "output",  text: "  Alias        :  Ankit Orion" },
  { kind: "output",  text: "  Role         :  Full-Stack Web Developer" },
  { kind: "output",  text: "  Education    :  B.Tech CSE · Lovely Professional University" },
  { kind: "output",  text: "  Location     :  Patna, Bihar, India" },
  { kind: "success", text: "  Status       :  Available for freelance" },
  { kind: "output",  text: "  Interests    :  Space Science · Philosophy · Cricket" },
  { kind: "divider" },
  { kind: "blank" },
  { kind: "output",  text: "  I spend my time building software, solving problems, and" },
  { kind: "output",  text: "  understanding how systems work — both in code and beyond." },
  { kind: "blank" },
];

const SKILLS: Line[] = [
  { kind: "blank" },
  { kind: "info",    text: "  FRONTEND" },
  { kind: "output",  text: "  |  React  Next.js  TypeScript  Tailwind CSS" },
  { kind: "blank" },
  { kind: "info",    text: "  BACKEND" },
  { kind: "output",  text: "  |  Node.js  Express  REST APIs  WebSockets" },
  { kind: "blank" },
  { kind: "info",    text: "  DATABASE" },
  { kind: "output",  text: "  |  PostgreSQL  MongoDB  MySQL  Prisma" },
  { kind: "blank" },
  { kind: "info",    text: "  DEVOPS & CLOUD" },
  { kind: "output",  text: "  |  Docker  Kubernetes  AWS  Azure  CI/CD  Git" },
  { kind: "blank" },
];

const PROJECTS: Line[] = [
  { kind: "blank" },
  { kind: "info",    text: "  Directory of C:\\Users\\Ankit\\Projects" },
  { kind: "blank" },
  { kind: "output",  text: "  01/01/2024  <DIR>  fullstack-leetcode" },
  { kind: "output",  text: "              React · Node.js · Docker · MongoDB" },
  { kind: "output",  text: "              Custom containerized code execution engine" },
  { kind: "blank" },
  { kind: "output",  text: "  06/03/2025  <DIR>  social-media-agency" },
  { kind: "output",  text: "              Next.js · Tailwind · Prisma · PostgreSQL" },
  { kind: "output",  text: "              Real-time analytics dashboard" },
  { kind: "blank" },
  { kind: "output",  text: "  12/06/2025  <DIR>  deployfast-edge" },
  { kind: "output",  text: "              Next.js · Kubernetes · Terraform" },
  { kind: "output",  text: "              Zero-latency hosting across 50+ regions" },
  { kind: "blank" },
  { kind: "output",  text: "  3 Dir(s)   —   Run 'github' to view all on GitHub" },
  { kind: "blank" },
];

const CONTACT: Line[] = [
  { kind: "blank" },
  { kind: "info",    text: "  CONTACT INFORMATION" },
  { kind: "divider" },
  { kind: "output",  text: "  GitHub    github.com/ankit-orion" },
  { kind: "output",  text: "  Twitter   x.com/OrionAnkit" },
  { kind: "output",  text: "  Website   ankitorion.com" },
  { kind: "output",  text: "  Hire Me   ankitorion.com/#contact" },
  { kind: "divider" },
  { kind: "blank" },
];

const DIR: Line[] = [
  { kind: "blank" },
  { kind: "info",    text: `  Directory of ${PROMPT_PATH}` },
  { kind: "blank" },
  { kind: "output",  text: "  <DIR>  about" },
  { kind: "output",  text: "  <DIR>  projects" },
  { kind: "output",  text: "  <DIR>  skills" },
  { kind: "output",  text: "  <DIR>  contact" },
  { kind: "output",  text: "  <DIR>  github" },
  { kind: "blank" },
  { kind: "output",  text: "  5 Dir(s)" },
  { kind: "blank" },
];

const BOOT: Line[] = [
  { kind: "boot",    text: "Ankit OS [Version 2025.04.16]" },
  { kind: "boot",    text: "(c) Ankit Corp. All rights reserved." },
  { kind: "blank" },
  { kind: "output",  text: "Type 'help' for a list of available commands." },
  { kind: "blank" },
];

const ALL_COMMANDS = [
  "help","whoami","about","skills","projects",
  "contact","github","dir","cls","exit","quit",
];

function run(raw: string, toggle: () => void): Line[] | "clear" {
  const cmd = raw.trim().toLowerCase();
  const echo: Line = { kind: "prompt", cmd: raw };

  switch (cmd) {
    case "help":     return [echo, ...HELP];
    case "whoami":   return [echo, ...WHOAMI];
    case "about":    return [echo, ...ABOUT];
    case "skills":   return [echo, ...SKILLS];
    case "projects": return [echo, ...PROJECTS];
    case "contact":  return [echo, ...CONTACT];
    case "dir":      return [echo, ...DIR];
    case "github":
      window.open("https://github.com/ankit-orion", "_blank");
      return [echo, { kind: "success", text: "Opening GitHub profile..." }, { kind: "blank" }];
    case "cls":      return "clear";
    case "exit":
    case "quit":
      toggle();
      return [echo, { kind: "success", text: "Returning to portfolio..." }, { kind: "blank" }];
    case "":
      return [{ kind: "blank" }];
    default:
      return [
        echo,
        { kind: "error", text: `'${raw}' is not recognized as an internal or external command,` },
        { kind: "error", text: "operable program or batch file." },
        { kind: "blank" },
      ];
  }
}

export function TerminalPortfolio() {
  const { toggle }                      = useTerminalMode();
  const [lines, setLines]               = useState<Line[]>(BOOT);
  const [input, setInput]               = useState("");
  const [history, setHistory]           = useState<string[]>([]);
  const [histIdx, setHistIdx]           = useState(-1);
  const [suggestion, setSuggestion]     = useState("");
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (!input) { setSuggestion(""); return; }
    const match = ALL_COMMANDS.find(
      (c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()
    );
    setSuggestion(match ? match.slice(input.length) : "");
  }, [input]);

  const submit = useCallback(() => {
    const result = run(input, toggle);
    if (result === "clear") {
      setLines(BOOT);
    } else {
      setLines((prev) => [...prev, ...result]);
    }
    if (input.trim()) setHistory((prev) => [input, ...prev].slice(0, 50));
    setHistIdx(-1);
    setInput("");
  }, [input, toggle]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(input + suggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
  };

  const renderLine = (line: Line, i: number) => {
    switch (line.kind) {
      case "blank":
        return <div key={i} className="h-[0.5em]" />;
      case "boot":
        return <div key={i} className="text-[#C0C0C0]">{line.text}</div>;
      case "divider":
        return <div key={i} className="text-[#404040]">{"─".repeat(60)}</div>;
      case "prompt":
        return (
          <div key={i} className="flex flex-wrap gap-x-1">
            <span className="text-[#C0C0C0] shrink-0 select-none">{PROMPT}</span>
            <span className="text-[#FFFFFF]">{line.cmd}</span>
          </div>
        );
      case "output":
        return <div key={i} className="text-[#C0C0C0] whitespace-pre-wrap">{line.text}</div>;
      case "info":
        return <div key={i} className="text-[#4EC9B0] whitespace-pre-wrap">{line.text}</div>;
      case "success":
        return <div key={i} className="text-[#6A9955] whitespace-pre-wrap">{line.text}</div>;
      case "error":
        return <div key={i} className="text-[#F44747] whitespace-pre-wrap">{line.text}</div>;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col overflow-hidden"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Cascadia Code','Consolas','Courier New',monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-[#2d2d2d] select-none">
        <span className="text-[#C0C0C0] text-xs">
          Command Prompt
        </span>
        <span className="text-[#8c8c8c] text-[11px] hidden sm:block">
          ankit@portfolio — {PROMPT_PATH}
        </span>
        <button
          onClick={toggle}
          className="text-[11px] text-[#8c8c8c] hover:text-white transition px-2 py-0.5 hover:bg-white/10 rounded"
        >
          ✕ exit
        </button>
      </div>

      {/* ── Scrollable output ──────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-5 sm:px-10 md:px-16 py-5 text-[13px] sm:text-sm leading-[1.75] min-h-0"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => renderLine(line, i))}

        {/* Live input row */}
        <div className="flex items-center flex-wrap gap-x-1 mt-[2px]">
          <span className="text-[#C0C0C0] shrink-0 select-none">{PROMPT}</span>
          <div className="relative flex items-center flex-1 min-w-[120px]">
            {/* visible text */}
            <span className="text-white whitespace-pre">{input}</span>
            {/* ghost completion */}
            {suggestion && (
              <span className="text-[#454545] whitespace-pre pointer-events-none">{suggestion}</span>
            )}
            {/* block cursor */}
            <span className="inline-block w-[8px] h-[14px] bg-[#AEAFAD] ml-px animate-pulse align-middle" />
            {/* invisible real input */}
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 opacity-0 w-full cursor-default"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal input"
            />
          </div>
        </div>

        <div ref={bottomRef} />
      </div>

      {/* ── Status bar ─────────────────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-4 py-1 bg-[#007ACC] text-[11px] text-white/90 select-none">
        <span className="flex items-center gap-2">
          <span>⬡</span>
          <span>ankit@portfolio</span>
        </span>
        <span className="hidden sm:flex items-center gap-4 opacity-80">
          <span>↑↓ history</span>
          <span>Tab complete</span>
          <span>Enter to run</span>
        </span>
        <span className="opacity-80">CMD</span>
      </div>
    </div>
  );
}
