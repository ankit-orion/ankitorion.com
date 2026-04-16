"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTerminalMode } from "@/lib/terminal-mode";

// ─── ASCII banner ────────────────────────────────────────────────────────────
const ASCII_BANNER = [
  " █████╗ ███╗   ██╗██╗  ██╗██╗████████╗",
  "██╔══██╗████╗  ██║██║ ██╔╝██║╚══██╔══╝",
  "███████║██╔██╗ ██║█████╔╝ ██║   ██║   ",
  "██╔══██║██║╚██╗██║██╔═██╗ ██║   ██║   ",
  "██║  ██║██║ ╚████║██║  ██╗██║   ██║   ",
  "╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝   ╚═╝  ",
];

// ─── Output line types ────────────────────────────────────────────────────────
type OutputLine =
  | { kind: "banner" }
  | { kind: "system"; text: string }
  | { kind: "blank" }
  | { kind: "command"; text: string }
  | { kind: "output"; text: string }
  | { kind: "error"; text: string }
  | { kind: "success"; text: string }
  | { kind: "divider" };

// ─── Command registry ─────────────────────────────────────────────────────────
const HELP_OUTPUT: OutputLine[] = [
  { kind: "output", text: "Available commands:" },
  { kind: "blank" },
  { kind: "output", text: "  whoami      — who is ankit?" },
  { kind: "output", text: "  about       — background & story" },
  { kind: "output", text: "  skills      — tech stack" },
  { kind: "output", text: "  projects    — featured work" },
  { kind: "output", text: "  contact     — get in touch" },
  { kind: "output", text: "  github      — open GitHub profile" },
  { kind: "output", text: "  ls          — list all sections" },
  { kind: "output", text: "  clear       — clear terminal" },
  { kind: "output", text: "  exit        — back to portfolio view" },
  { kind: "blank" },
];

const WHOAMI_OUTPUT: OutputLine[] = [
  { kind: "output", text: "Ankit Mishra (Ankit Orion)" },
  { kind: "output", text: "Full-Stack Web Developer" },
  { kind: "output", text: "Patna, Bihar, India" },
  { kind: "blank" },
];

const ABOUT_OUTPUT: OutputLine[] = [
  { kind: "divider" },
  { kind: "output", text: "  Name        : Ankit Mishra" },
  { kind: "output", text: "  Alias       : Ankit Orion" },
  { kind: "output", text: "  Role        : Full-Stack Web Developer" },
  { kind: "output", text: "  Education   : B.Tech CSE · Lovely Professional University" },
  { kind: "output", text: "  Location    : Patna, Bihar, India" },
  { kind: "output", text: "  Status      : ✓ Available for freelance" },
  { kind: "output", text: "  Interests   : Space science · Philosophy · Cricket" },
  { kind: "divider" },
  { kind: "blank" },
  { kind: "output", text: "  I spend my time building software, solving problems," },
  { kind: "output", text: "  and understanding how systems work — both in code and" },
  { kind: "output", text: "  beyond it. Deeply interested in space and philosophy." },
  { kind: "blank" },
];

const SKILLS_OUTPUT: OutputLine[] = [
  { kind: "divider" },
  { kind: "output", text: "  FRONTEND" },
  { kind: "output", text: "  ├─ React · Next.js · TypeScript · Tailwind CSS" },
  { kind: "blank" },
  { kind: "output", text: "  BACKEND" },
  { kind: "output", text: "  ├─ Node.js · Express · REST APIs · WebSockets" },
  { kind: "blank" },
  { kind: "output", text: "  DATABASE" },
  { kind: "output", text: "  ├─ PostgreSQL · MongoDB · MySQL · Prisma" },
  { kind: "blank" },
  { kind: "output", text: "  DEVOPS & CLOUD" },
  { kind: "output", text: "  ├─ Docker · Kubernetes · AWS · Azure · CI/CD · Git" },
  { kind: "divider" },
  { kind: "blank" },
];

const PROJECTS_OUTPUT: OutputLine[] = [
  { kind: "divider" },
  { kind: "output", text: "  01  Full Stack LeetCode Platform Clone" },
  { kind: "output", text: "      React · Node.js · Docker · MongoDB" },
  { kind: "output", text: "      Custom containerized code execution engine" },
  { kind: "blank" },
  { kind: "output", text: "  02  Social Media Agency Platform" },
  { kind: "output", text: "      Next.js · Tailwind · Prisma · PostgreSQL" },
  { kind: "output", text: "      Dashboard with real-time analytics" },
  { kind: "blank" },
  { kind: "output", text: "  03  DeployFast Edge Infrastructure" },
  { kind: "output", text: "      Next.js · Kubernetes · Terraform · Edge Functions" },
  { kind: "output", text: "      Zero-latency hosting across 50+ regions" },
  { kind: "divider" },
  { kind: "blank" },
  { kind: "output", text: "  → Run 'github' to see all projects on GitHub" },
  { kind: "blank" },
];

const CONTACT_OUTPUT: OutputLine[] = [
  { kind: "divider" },
  { kind: "output", text: "  GitHub   : github.com/ankit-orion" },
  { kind: "output", text: "  Twitter  : x.com/OrionAnkit" },
  { kind: "output", text: "  Site     : ankitorion.com" },
  { kind: "output", text: "  Contact  : ankitorion.com/#contact" },
  { kind: "divider" },
  { kind: "blank" },
];

const LS_OUTPUT: OutputLine[] = [
  { kind: "output", text: "hero/      projects/   skills/    about/" },
  { kind: "output", text: "github/    contact/    books/     terminal/" },
  { kind: "blank" },
];

// ─── Boot sequence shown on first load ───────────────────────────────────────
const BOOT_LINES: OutputLine[] = [
  { kind: "system", text: `Last login: ${new Date().toDateString()} on portfolio` },
  { kind: "blank" },
  { kind: "banner" },
  { kind: "blank" },
  { kind: "system", text: "  Full-Stack Web Developer · Patna, Bihar, India" },
  { kind: "blank" },
  { kind: "success", text: "  Type 'help' to see all commands" },
  { kind: "blank" },
];

function processCommand(raw: string, toggle: () => void): OutputLine[] {
  const cmd = raw.trim().toLowerCase();
  const result: OutputLine[] = [{ kind: "command", text: raw }];

  switch (cmd) {
    case "help":       return [...result, ...HELP_OUTPUT];
    case "whoami":     return [...result, ...WHOAMI_OUTPUT];
    case "about":      return [...result, ...ABOUT_OUTPUT];
    case "skills":     return [...result, ...SKILLS_OUTPUT];
    case "projects":   return [...result, ...PROJECTS_OUTPUT];
    case "contact":    return [...result, ...CONTACT_OUTPUT];
    case "ls":         return [...result, ...LS_OUTPUT];
    case "github":
      window.open("https://github.com/ankit-orion", "_blank");
      return [...result, { kind: "success", text: "Opening GitHub..." }, { kind: "blank" }];
    case "clear":
      return []; // signals a full clear
    case "exit":
    case "quit":
      toggle();
      return [...result, { kind: "success", text: "Switching to portfolio view..." }, { kind: "blank" }];
    case "":
      return [{ kind: "blank" }];
    default:
      return [
        ...result,
        { kind: "error", text: `bash: ${raw}: command not found` },
        { kind: "output", text: "Type 'help' to see available commands." },
        { kind: "blank" },
      ];
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TerminalPortfolio() {
  const { toggle } = useTerminalMode();
  const [lines, setLines] = useState<OutputLine[]>(BOOT_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Focus input on mount and on click anywhere in terminal
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = useCallback(() => {
    if (input.trim() === "") {
      setLines((prev) => [...prev, { kind: "blank" }]);
      setInput("");
      return;
    }

    const result = processCommand(input, toggle);

    if (result.length === 0) {
      // "clear" command
      setLines(BOOT_LINES);
    } else {
      setLines((prev) => [...prev, ...result]);
    }

    setHistory((prev) => [input, ...prev].slice(0, 50));
    setHistoryIdx(-1);
    setInput("");
  }, [input, toggle]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    }
  };

  const renderLine = (line: OutputLine, i: number) => {
    switch (line.kind) {
      case "banner":
        return (
          <div key={i} className="my-2">
            {ASCII_BANNER.map((row, j) => (
              <div key={j} className="text-green-400 dark:text-green-400 text-[10px] sm:text-xs leading-tight font-mono whitespace-pre">
                {row}
              </div>
            ))}
          </div>
        );
      case "system":
        return <div key={i} className="text-gray-500 text-xs sm:text-sm">{line.text}</div>;
      case "blank":
        return <div key={i} className="h-2" />;
      case "command":
        return (
          <div key={i} className="flex items-start gap-2 mt-1">
            <span className="text-green-400 shrink-0 select-none">❯</span>
            <span className="text-white">{line.text}</span>
          </div>
        );
      case "output":
        return (
          <div key={i} className="text-gray-300 text-xs sm:text-sm pl-1 whitespace-pre-wrap leading-relaxed">
            {line.text}
          </div>
        );
      case "error":
        return (
          <div key={i} className="text-red-400 text-xs sm:text-sm pl-1">
            {line.text}
          </div>
        );
      case "success":
        return (
          <div key={i} className="text-green-400 text-xs sm:text-sm pl-1">
            {line.text}
          </div>
        );
      case "divider":
        return (
          <div key={i} className="text-gray-700 text-xs sm:text-sm pl-1">
            {"─".repeat(48)}
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] bg-[#0d0d0d] flex flex-col font-mono overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal output — scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 pt-24 pb-4 text-sm">
        {lines.map((line, i) => renderLine(line, i))}

        {/* Live input line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-400 shrink-0 select-none">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-green-400 text-xs sm:text-sm"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="terminal input"
          />
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Bottom status bar */}
      <div className="shrink-0 px-4 sm:px-8 py-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-gray-600 select-none">
        <span>ankit@portfolio <span className="text-green-600">~</span></span>
        <span className="hidden sm:block">↑↓ history · enter to run · type 'exit' to leave</span>
        <span>terminal mode</span>
      </div>
    </div>
  );
}
