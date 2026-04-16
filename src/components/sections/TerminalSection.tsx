"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";

type Line =
  | { kind: "command"; text: string }
  | { kind: "output"; text: string }
  | { kind: "blank" };

const SCRIPT: Line[] = [
  { kind: "command", text: "whoami" },
  { kind: "output",  text: "ankit-mishra" },
  { kind: "blank" },
  { kind: "command", text: "cat about.txt" },
  { kind: "output",  text: "Full-Stack Developer · Patna, Bihar" },
  { kind: "output",  text: "B.Tech CSE · Lovely Professional University" },
  { kind: "output",  text: "Interested in space, philosophy & cricket" },
  { kind: "blank" },
  { kind: "command", text: "cat skills.json" },
  { kind: "output",  text: '{' },
  { kind: "output",  text: '  "frontend"  : ["React", "Next.js", "TypeScript", "Tailwind"],' },
  { kind: "output",  text: '  "backend"   : ["Node.js", "Express", "PostgreSQL", "MongoDB"],' },
  { kind: "output",  text: '  "devops"    : ["Docker", "Kubernetes", "AWS", "Azure", "CI/CD"]' },
  { kind: "output",  text: '}' },
  { kind: "blank" },
  { kind: "command", text: "cat status.txt" },
  { kind: "output",  text: "✓  Available for freelance" },
  { kind: "output",  text: "✓  Open to full-time roles" },
  { kind: "blank" },
  { kind: "command", text: "echo $CONTACT" },
  { kind: "output",  text: "→  ankitorion.com/#contact" },
];

// How long each character takes to type (ms)
const CHAR_DELAY = 28;
// Pause after each command before showing output (ms)
const OUTPUT_DELAY = 180;
// Pause between script lines (ms)
const LINE_DELAY = 60;

export function TerminalSection() {
  // visibleLines: array of fully-revealed lines
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  // currentTyping: the command line currently being typed char-by-char
  const [currentTyping, setCurrentTyping] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((res) => setTimeout(res, ms));

    async function run() {
      for (const line of SCRIPT) {
        if (cancelled) return;

        if (line.kind === "blank") {
          await sleep(LINE_DELAY);
          setVisibleLines((prev) => [...prev, line]);
          continue;
        }

        if (line.kind === "command") {
          // Type the command char by char
          let typed = "";
          setCurrentTyping("");
          for (const ch of line.text) {
            if (cancelled) return;
            typed += ch;
            setCurrentTyping(typed);
            await sleep(CHAR_DELAY);
          }
          // Commit the finished command, clear typing cursor
          setCurrentTyping(null);
          setVisibleLines((prev) => [...prev, line]);
          await sleep(OUTPUT_DELAY);
          continue;
        }

        if (line.kind === "output") {
          await sleep(LINE_DELAY);
          setVisibleLines((prev) => [...prev, line]);
        }
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  // Auto-scroll to bottom as lines appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleLines, currentTyping]);

  return (
    <section id="terminal" className="relative w-full overflow-hidden">
      <SectionCornerMarks />

      <div className="py-20 md:py-32 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-44 2xl:px-56 max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 mb-6">
            <span className="text-xs">✦</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Terminal
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
            Read the source,<br />
            <span className="text-gray-400 dark:text-gray-500 font-medium italic">not the summary</span>
          </h2>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-[16px] overflow-hidden border border-black/[0.08] dark:border-white/[0.08] shadow-2xl max-w-2xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#1c1c1e] border-b border-black/[0.06] dark:border-white/[0.06]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 font-mono">
              ankit@ankitorion ~ %
            </span>
          </div>

          {/* Body */}
          <div className="bg-[#fafafa] dark:bg-[#0d0d0d] px-5 py-5 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[280px] max-h-[440px] overflow-y-auto">

            {visibleLines.map((line, i) => {
              if (line.kind === "blank") {
                return <div key={i} className="h-3" />;
              }
              if (line.kind === "command") {
                return (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#28c840] select-none shrink-0">❯</span>
                    <span className="text-gray-900 dark:text-gray-100">{line.text}</span>
                  </div>
                );
              }
              // output
              return (
                <div key={i} className="pl-5 text-gray-500 dark:text-[#8b949e] whitespace-pre">
                  {line.text}
                </div>
              );
            })}

            {/* Currently typing command */}
            {currentTyping !== null && (
              <div className="flex items-start gap-2">
                <span className="text-[#28c840] select-none shrink-0">❯</span>
                <span className="text-gray-900 dark:text-gray-100">
                  {currentTyping}
                  <span className="inline-block w-[2px] h-[1em] bg-gray-900 dark:bg-gray-100 ml-[1px] align-middle animate-pulse" />
                </span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
