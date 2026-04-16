"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Minus, Square, X } from "lucide-react";
import { useTerminalMode } from "@/lib/terminal-mode";

// ─── Types ────────────────────────────────────────────────────────────────────
type Line =
  | { kind: "blank" }
  | { kind: "boot";    text: string }
  | { kind: "prompt";  cmd: string }          // shows the prompt + command typed
  | { kind: "output";  text: string }
  | { kind: "info";    text: string }          // cyan — headers / labels
  | { kind: "success"; text: string }          // green
  | { kind: "error";   text: string }          // red
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
  { kind: "divider" },
  { kind: "blank" },
  { kind: "info",    text: "  Name        :  Ankit Mishra" },
  { kind: "output",  text: "  Alias        :  Ankit Orion" },
  { kind: "output",  text: "  Role         :  Full-Stack Web Developer" },
  { kind: "output",  text: "  Education    :  B.Tech CSE · Lovely Professional University" },
  { kind: "output",  text: "  Location     :  Patna, Bihar, India" },
  { kind: "success", text: "  Status       :  Available for freelance" },
  { kind: "output",  text: "  Interests    :  Space Science · Philosophy · Cricket" },
  { kind: "blank" },
  { kind: "divider" },
  { kind: "blank" },
  { kind: "output",  text: "  I spend my time building software, solving problems, and" },
  { kind: "output",  text: "  understanding how systems work — both in code and beyond" },
  { kind: "output",  text: "  it. Deeply interested in space and philosophy." },
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
  { kind: "output",  text: "              3 Dir(s)    Run 'github' to view all on GitHub" },
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
  { kind: "output",  text: "              5 Dir(s)" },
  { kind: "blank" },
];

// ─── Boot sequence ────────────────────────────────────────────────────────────
const BOOT: Line[] = [
  { kind: "boot",    text: "Ankit OS [Version 2025.04.16]" },
  { kind: "boot",    text: "(c) Ankit Corp. All rights reserved." },
  { kind: "blank" },
  { kind: "output",  text: "Type 'help' for a list of available commands." },
  { kind: "blank" },
];

const ALL_COMMANDS = ["help","whoami","about","skills","projects","contact","github","dir","cls","exit","quit"];

// ─── Command processor ────────────────────────────────────────────────────────
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
    case "cls":
      return "clear";
    case "exit":
    case "quit":
      toggle();
      return [echo, { kind: "success", text: "Returning to portfolio..." }, { kind: "blank" }];
    case "":
      return [{ kind: "blank" }];
    default:
      return [
        echo,
        { kind: "error",  text: `'${raw}' is not recognized as an internal or external command,` },
        { kind: "error",  text: "operable program or batch file." },
        { kind: "blank" },
      ];
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TerminalPortfolio() {
  const { toggle } = useTerminalMode();
  const [lines, setLines]       = useState<Line[]>(BOOT);
  const [input, setInput]       = useState("");
  const [history, setHistory]   = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const inputRef  = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Tab-complete suggestion
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
        return <div key={i} className="h-[0.6em]" />;
      case "boot":
        return <div key={i} className="text-[#C0C0C0]">{line.text}</div>;
      case "divider":
        return <div key={i} className="text-[#555]">{"─".repeat(56)}</div>;
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
    /* Backdrop */
    <div className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center p-0 sm:p-6 md:p-10"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal window */}
      <div
        className="w-full h-full sm:h-auto sm:max-h-[88vh] sm:rounded-lg overflow-hidden flex flex-col shadow-2xl border border-[#3c3c3c]"
        style={{ maxWidth: "860px", background: "#0C0C0C" }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Title bar ── */}
        <div className="flex items-center justify-between px-3 py-2 bg-[#1e1e1e] border-b border-[#3c3c3c] select-none shrink-0">
          {/* Window controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggle}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition flex items-center justify-center group"
              title="Exit terminal"
            >
              <X className="w-1.5 h-1.5 text-[#800000] opacity-0 group-hover:opacity-100" />
            </button>
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Title */}
          <span className="text-[11px] text-[#8c8c8c] font-medium tracking-wide absolute left-1/2 -translate-x-1/2">
            Command Prompt — ankit@portfolio
          </span>

          {/* Spacer */}
          <div className="w-12" />
        </div>

        {/* ── Terminal body ── */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] sm:text-sm leading-[1.6] min-h-0"
          style={{ fontFamily: "'Cascadia Code', 'Consolas', 'Courier New', monospace" }}
        >
          {lines.map((line, i) => renderLine(line, i))}

          {/* Active input line */}
          <div className="flex items-center flex-wrap gap-x-1 mt-[2px]">
            <span className="text-[#C0C0C0] shrink-0 select-none">{PROMPT}</span>
            <div className="relative flex items-center flex-1 min-w-0">
              <span className="text-[#FFFFFF] whitespace-pre">{input}</span>
              {/* Ghost tab-completion */}
              {suggestion && (
                <span className="text-[#555] whitespace-pre pointer-events-none">{suggestion}</span>
              )}
              {/* Blinking block cursor */}
              <span className="inline-block w-[8px] h-[15px] bg-[#AEAFAD] ml-[1px] animate-pulse align-middle" />
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

        {/* ── Status bar ── */}
        <div className="shrink-0 px-4 py-1.5 bg-[#007ACC] flex items-center justify-between text-[11px] text-white/90 select-none">
          <span className="flex items-center gap-2">
            <span className="opacity-80">⬡</span>
            <span>ankit@portfolio</span>
          </span>
          <span className="hidden sm:flex items-center gap-4 opacity-80">
            <span>↑↓ history</span>
            <span>Tab complete</span>
            <span>Enter run</span>
          </span>
          <span className="opacity-80">CMD</span>
        </div>
      </div>
    </div>
  );
}
