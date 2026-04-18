"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const books = [
  {
    id: "01",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: "170 AD",
    label: "Stoicism",
    quote: "The happiness of your life depends upon the quality of your thoughts.",
    cover: "#f5e8e8",   // rose pink
    spine: "#e8cece",
    accent: "#7a2a2a",
    pageEdge: "#faf2f2",
    light: false,
  },
  {
    id: "02",
    title: "The Republic",
    author: "Plato",
    year: "375 BC",
    label: "Philosophy",
    quote: "Philosophy begins in wonder. Knowledge is the food of the soul.",
    cover: "#f0ebe0",   // warm parchment
    spine: "#ddd5c4",
    accent: "#2c4a3e",
    pageEdge: "#f8f4ec",
    light: false,
  },
  {
    id: "03",
    title: "Cosmos",
    author: "Carl Sagan",
    year: "1980",
    label: "Science",
    quote: "We are a way for the cosmos to know itself.",
    cover: "#e4f0ea",   // sage mint green
    spine: "#c8e0d4",
    accent: "#1a4a30",
    pageEdge: "#f0f8f4",
    light: false,
  },
  {
    id: "04",
    title: "Beyond Good\n& Evil",
    author: "Nietzsche",
    year: "1886",
    label: "Philosophy",
    quote: "He who fights with monsters might take care lest he thereby become a monster.",
    cover: "#ece8f5",   // soft lavender
    spine: "#d8d0ec",
    accent: "#3a2870",
    pageEdge: "#f6f4fc",
    light: false,
  },
  {
    id: "05",
    title: "The Almanac\nof Naval",
    author: "Eric Jorgenson",
    year: "2020",
    label: "Wealth & Wisdom",
    quote: "Seek wealth, not money or status. Wealth is having assets that earn while you sleep.",
    cover: "#f5f2c0",   // canary yellow
    spine: "#e8e4a0",
    accent: "#5a4e10",
    pageEdge: "#fafae0",
    light: false,
  },
  {
    id: "06",
    title: "Letters from\na Stoic",
    author: "Seneca",
    year: "65 AD",
    label: "Stoicism",
    quote: "We suffer more in imagination than in reality.",
    cover: "#f5dfd4",   // warm salmon / terracotta
    spine: "#e8c8b8",
    accent: "#6e2c18",
    pageEdge: "#faede8",
    light: false,
  },
  {
    id: "07",
    title: "On the Shortness\nof Life",
    author: "Seneca",
    year: "49 AD",
    label: "Stoicism",
    quote: "It is not that we have a short time to live, but that we waste a great deal of it.",
    cover: "#d8eef8",   // pale sky blue
    spine: "#bcd8ec",
    accent: "#1a3e68",
    pageEdge: "#eef6fc",
    light: false,
  },
  {
    id: "08",
    title: "The\nMetamorphosis",
    author: "Franz Kafka",
    year: "1915",
    label: "Absurdism",
    quote: "I cannot make you understand. I cannot make anyone understand what is happening inside me.",
    cover: "#e4e8f4",   // cool steel blue-gray
    spine: "#ccd4e8",
    accent: "#28385c",
    pageEdge: "#f2f4fa",
    light: false,
  },
  {
    id: "09",
    title: "The Trial",
    author: "Franz Kafka",
    year: "1925",
    label: "Absurdism",
    quote: "It's often better to be in chains than to be free.",
    cover: "#eef2dc",   // warm chartreuse / light olive
    spine: "#dce4c0",
    accent: "#344020",
    pageEdge: "#f6f8ec",
    light: false,
  },
];

const INTERVAL = 5000;

export function BookSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const advance = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + books.length) % books.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => advance(1), INTERVAL);
    return () => clearInterval(t);
  }, [paused, advance]);

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 15000);
  };

  const handleNav = (dir: number) => {
    advance(dir);
    setPaused(true);
    setTimeout(() => setPaused(false), 15000);
  };

  const book = books[index];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      rotateY: dir > 0 ? 55 : -55,
      opacity: 0,
      scale: 0.88,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      rotateY: dir > 0 ? -55 : 55,
      opacity: 0,
      scale: 0.88,
      transition: { duration: 0.4, ease: [0.55, 0.055, 0.675, 0.19] },
    }),
  };

  return (
    <section id="library" className="relative w-full overflow-hidden bg-white dark:bg-[#050505] py-20 md:py-32">
      <SectionCornerMarks />
      <div className="px-4 md:px-8 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* ── Left: text ── */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">Live Reading Scroll</span>
          </div>

          <h2 className="text-3xl sx:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight dark:text-white leading-[1.05]">
            Books I'm Reading <br />
            <span className="font-bold">&amp; Personal</span> <br />
            <span className="text-gray-400 dark:text-gray-600 italic">Favourites.</span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
            A curated selection of the logic, philosophy, and cosmic wisdom that currently fuels my growth.
          </p>

          {/* Progress dots */}
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            {books.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center w-6 h-6"
                aria-label={`Go to book ${i + 1}`}
              >
                <span className={`h-1.5 rounded-full transition-all duration-300 block ${
                  i === index
                    ? "w-8 bg-black dark:bg-white"
                    : "w-1.5 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`} />
              </button>
            ))}
          </div>

          {/* Timer bar */}
          <div className="h-px w-full max-w-[200px] overflow-hidden bg-gray-100 dark:bg-white/5 rounded-full mx-auto lg:mx-0">
            <motion.div
              key={index}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTERVAL / 1000, ease: "linear" }}
              className="h-full bg-black dark:bg-white origin-left"
            />
          </div>
        </div>

        {/* ── Right: 3D book + navigation ── */}
        <div className="flex flex-col items-center gap-6">

          {/* Nav + book row */}
          <div className="flex items-center gap-4 sm:gap-6">

            {/* Prev */}
            <button
              onClick={() => handleNav(-1)}
              className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 flex-shrink-0"
              aria-label="Previous book"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Book with perspective wrapper */}
            <div style={{ perspective: "1000px" }}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ transformStyle: "preserve-3d" }}
                  className="relative w-[200px] sx:w-[230px] sm:w-[260px] md:w-[280px]"
                >
                  {/* ── Book body ── */}
                  <div
                    className="relative rounded-r-[6px] overflow-hidden select-none"
                    style={{
                      backgroundColor: book.cover,
                      boxShadow: `
                        4px 0 0 ${book.pageEdge},
                        6px 0 0 #d0c8b0,
                        8px 2px 20px rgba(0,0,0,0.4),
                        0 20px 60px rgba(0,0,0,0.35)
                      `,
                    }}
                  >
                    {/* Spine strip */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-9 flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: book.spine }}
                    >
                      {/* Spine texture lines */}
                      <div className="absolute inset-0 flex flex-col justify-between py-6 opacity-20">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-px w-full" style={{ backgroundColor: book.light ? "#fff" : "#000" }} />
                        ))}
                      </div>
                      {/* Spine author text */}
                      <span
                        className="text-[7px] font-black uppercase tracking-[0.25em] whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          color: book.accent,
                          opacity: 0.9,
                        }}
                      >
                        {book.author}
                      </span>
                    </div>

                    {/* Spine-to-cover shadow gutter */}
                    <div
                      className="absolute left-9 top-0 bottom-0 w-4 pointer-events-none"
                      style={{
                        background: `linear-gradient(to right, ${book.light ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.15)"}, transparent)`,
                      }}
                    />

                    {/* Cover content */}
                    <div className="pl-14 pr-5 pt-6 pb-6 flex flex-col justify-between min-h-[340px] sx:min-h-[370px] sm:min-h-[400px]">

                      {/* Top: label + year */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="text-[8px] font-black uppercase tracking-[0.5em]"
                            style={{ color: book.accent }}
                          >
                            {book.label}
                          </span>
                          <span
                            className="text-[8px] font-mono opacity-40"
                            style={{ color: book.light ? "#fff" : "#000" }}
                          >
                            {book.year}
                          </span>
                        </div>

                        {/* Accent rule */}
                        <div className="h-px mb-4 opacity-50" style={{ backgroundColor: book.accent }} />

                        {/* Title */}
                        <h3
                          className="text-xl sx:text-2xl sm:text-3xl font-black uppercase tracking-tighter leading-[1.0] whitespace-pre-line"
                          style={{ color: book.light ? "#ffffff" : "#111111" }}
                        >
                          {book.title}
                        </h3>
                      </div>

                      {/* Middle: quote */}
                      <div
                        className="my-4 pl-3 border-l-2"
                        style={{ borderColor: book.accent + "80" }}
                      >
                        <p
                          className="text-[11px] sm:text-xs font-serif italic leading-relaxed"
                          style={{ color: book.light ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}
                        >
                          &ldquo;{book.quote}&rdquo;
                        </p>
                      </div>

                      {/* Bottom: author */}
                      <div>
                        <div className="h-px mb-3 opacity-20" style={{ backgroundColor: book.light ? "#fff" : "#000" }} />
                        <p
                          className="text-[9px] font-black uppercase tracking-[0.4em]"
                          style={{ color: book.accent }}
                        >
                          — {book.author}
                        </p>
                      </div>
                    </div>

                    {/* Corner number */}
                    <div
                      className="absolute bottom-5 right-4 text-[9px] font-black opacity-10 select-none"
                      style={{ color: book.light ? "#fff" : "#000" }}
                    >
                      {book.id}
                    </div>
                  </div>

                  {/* Cast shadow on surface */}
                  <div
                    className="absolute -bottom-3 left-4 right-4 h-6 rounded-full blur-lg opacity-50 pointer-events-none"
                    style={{ backgroundColor: book.cover }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next */}
            <button
              onClick={() => handleNav(1)}
              className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 flex-shrink-0"
              aria-label="Next book"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Book title below on mobile */}
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 lg:hidden"
          >
            {book.title.replace("\n", " ")} &mdash; {book.author}
          </motion.p>

        </div>
      </div>
    </section>
  );
}
