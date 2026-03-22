"use client";

import {
  ArrowRight,
  MoveRight,
  Atom,
  Database,
  Server,
  Layers,
  Layout,
  Code,
  Zap,
  Box,
  Terminal,
  Container,
  Globe,
  Github,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { SectionCornerMarks } from "@/components/ui/GridLines";

const projects = [
  {
    id: 1,
    id_name: "leetcode",
    year: "2024",
    type: "Full Stack Web App",
    title: "Full Stack LeetCode Platform Clone",
    description: "A high-performance coding platform featuring a custom containerized execution engine and an interactive editor for competitive programming.",
    skills: ["React", "Node.js", "Docker", "MongoDB"],
    liveUrl: "#",
    repoUrl: "https://github.com/ankit-orion",
    color: "bg-[#e0efff]",
    shadow: "shadow-blue-200/50",
    previewTitle: "Interactive Coding Platform",
    previewImage: "/vertex.png",
  },
  {
    id: 2,
    id_name: "social-media",
    year: "2025",
    type: "Marketing Website & Admin",
    title: "Social Media Agency Platform & Dashboard",
    description: "A data-driven dashboard for marketing agencies to track global campaigns and manage client reporting with real-time analytics.",
    skills: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    repoUrl: "https://github.com/ankit-orion",
    color: "bg-[#efe4ff]",
    shadow: "shadow-purple-200/50",
    previewTitle: "Agency Client Dashboard",
    previewImage: "/socialmedia.png",
  },
  {
    id: 3,
    id_name: "deployfast",
    year: "2025",
    type: "Cloud Hosting & CI/CD Platform",
    title: "DeployFast Edge Infrastructure",
    description: "An edge-computing infrastructure platform built for zero-latency hosting and automated global deployments across 50+ regions.",
    skills: ["Next.js", "Edge Functions", "Kubernetes", "Terraform"],
    liveUrl: "#",
    repoUrl: "https://github.com/ankit-orion",
    color: "bg-[#e4ffdf]",
    shadow: "shadow-green-200/50",
    previewTitle: "Global Edge Network Dashboard",
    previewImage: "/DeployFast.png",
  },
  {
    id: 4,
    id_name: "doodlemark",
    year: "2025",
    type: "Collaborative Whiteboard & Docs",
    title: "DoodleMark Visual Workspace",
    description: "A collaborative visual workspace with an infinite canvas and sub-50ms latency for multiplayer cursor and diagram synchronization.",
    skills: ["React", "WebSockets", "Canvas API", "Node.js"],
    liveUrl: "#",
    repoUrl: "https://github.com/ankit-orion",
    color: "bg-[#fff8df]",
    shadow: "shadow-yellow-200/40",
    previewTitle: "Real-time Infinite Canvas",
    previewImage: "/eraser.png",
  },
];

const getSkillIcon = (skill: string) => {
  switch (skill.toLowerCase()) {
    case "react": return <Atom className="w-full h-full" />;
    case "node.js": return <Server className="w-full h-full" />;
    case "docker": return <Container className="w-full h-full" />;
    case "mongodb": return <Database className="w-full h-full" />;
    case "next.js": return <Zap className="w-full h-full" />;
    case "tailwind css": return <Layout className="w-full h-full" />;
    case "prisma": return <Layers className="w-full h-full" />;
    case "postgresql": return <Database className="w-full h-full" />;
    case "edge functions": return <Globe className="w-full h-full" />;
    case "kubernetes": return <Box className="w-full h-full" />;
    case "terraform": return <Terminal className="w-full h-full" />;
    case "websockets": return <Zap className="w-full h-full" />;
    case "canvas api": return <Code className="w-full h-full" />;
    default: return <Code className="w-full h-full" />;
  }
};

export function FeaturedProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  const headingOpacity = useTransform(scrollYProgress, [0, 0.04, 0.82, 0.95], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.82, 0.95], [0, -40]);

  const [cardTop, setCardTop] = useState(isMobile ? 140 : 200);
  useEffect(() => {
    if (!headingRef.current) return;
    const update = () => {
      if (headingRef.current) {
        setCardTop(headingRef.current.offsetHeight + 64 + 8);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(headingRef.current);
    return () => ro.disconnect();
  }, []);

  const [flyingCards, setFlyingCards] = useState<{ id: number; dir: number }[]>([]);
  const [swipes, setSwipes] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.7) {
      setShowHint(true);
    } else {
      setShowHint(false);
      if (latest < 0.5 && swipes > 0 && flyingCards.length === 0) {
        setSwipes(0);
      }
    }
  });

  const total = projects.length;
  const frontIndex = (total - 1 - (swipes % total) + total) % total;
  const activeCardIndex = frontIndex;

  const handleSwipe = (index: number, dir: number) => {
    setFlyingCards((prev) => [...prev, { id: index, dir }]);
    setTimeout(() => {
      setSwipes((prev) => prev + 1);
    }, 50);
  };

  const handleAnimationComplete = (id: number) => {
    setFlyingCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative w-full overflow-x-clip isolate"
    >
      <SectionCornerMarks />

      <motion.div
        ref={headingRef}
        style={{ opacity: headingOpacity, y: headingY }}
        className="fixed top-[64px] left-0 right-0 z-[55] bg-white dark:bg-[#050505] py-5 md:py-7 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 pointer-events-none"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center text-gray-800 dark:text-gray-200 tracking-tight leading-tight">
          Some <span className="font-bold text-black dark:text-white italic">Of My</span>{" "}
          Featured Project
        </h2>
      </motion.div>

      <div className="pt-12 md:pt-24 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-5xl mx-auto">
        <div className="relative">
          {projects.map((project, i) => {
            const effectiveCardsAbove = (frontIndex - i + total) % total;
            const isFlying = flyingCards.some((c) => c.id === i);

            return (
              <div
                key={project.id}
                className="sticky flex justify-center w-full"
                style={{
                  top: `calc(env(safe-area-inset-top, 0px) + ${cardTop}px)`,
                  marginBottom: i === projects.length - 1 ? 0 : isMobile ? "10vh" : "15vh",
                  zIndex: isFlying ? 50 : 40 - effectiveCardsAbove,
                }}
              >
                <Card
                  project={project}
                  index={i}
                  progress={scrollYProgress}
                  total={projects.length}
                  flyingData={flyingCards.find((s) => s.id === i)}
                  onSwipe={(dir) => handleSwipe(i, dir)}
                  onAnimationComplete={() => handleAnimationComplete(i)}
                  isDraggable={activeCardIndex === i && !isFlying}
                  showHint={showHint}
                  effectiveCardsAbove={effectiveCardsAbove}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-[40vh] pointer-events-none" />
    </section>
  );
}

function Card({
  project,
  index,
  progress,
  total,
  flyingData,
  onSwipe,
  onAnimationComplete,
  isDraggable,
  effectiveCardsAbove,
  showHint,
}: {
  project: (typeof projects)[0];
  index: number;
  progress: any;
  total: number;
  flyingData?: { id: number; dir: number };
  onSwipe: (dir: number) => void;
  onAnimationComplete: () => void;
  isDraggable: boolean;
  effectiveCardsAbove: number;
  showHint: boolean;
}) {
  const start = index / total;
  const isFlying = !!flyingData;
  const swipeDirection = flyingData ? flyingData.dir : 1;

  const targetScale = isFlying ? 1 : 1 - effectiveCardsAbove * 0.04;
  const rawScale = useTransform(progress, [start, start + 0.15, 1], [1, 1, targetScale]);
  const scale = useSpring(rawScale, { stiffness: 200, damping: 20 });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const staggerY = isMobile ? 0 : 10;
  const frozenEffectiveCards = isFlying ? 0 : effectiveCardsAbove;
  const visualStagger = frozenEffectiveCards * staggerY;

  const swipeThreshold = isMobile ? 60 : 80;
  const swipeVelocityThreshold = isMobile ? 250 : 350;

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      dragListener={isDraggable}
      onDragEnd={(e, info) => {
        if (Math.abs(info.offset.x) > swipeThreshold || Math.abs(info.velocity.x) > swipeVelocityThreshold) {
          onSwipe(Math.sign(info.offset.x) || 1);
        }
      }}
      onAnimationComplete={() => {
        if (isFlying) onAnimationComplete();
      }}
      animate={
        isFlying
          ? { x: `${swipeDirection * 150}vw`, opacity: 0, rotate: swipeDirection * 15, y: visualStagger, transitionEnd: { x: 0, rotate: 0 } }
          : { x: 0, opacity: 1, rotate: 0, y: visualStagger }
      }
      transition={{ type: "spring", stiffness: 350, damping: 40 }}
      style={{ scale, transformOrigin: "top center" }}
      className={`relative w-full mx-auto max-w-3xl rounded-[24px] sm:rounded-[36px] md:rounded-[40px] p-4 sm:p-5 md:p-7 lg:p-8 ${project.color} ${project.shadow} shadow-2xl overflow-hidden border border-white/40 ring-1 ring-black/5 flex flex-col max-h-[78vh] sm:max-h-[80vh] md:max-h-[82vh] lg:max-h-[78vh] xl:max-h-[80vh] ${isDraggable ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      {/* Swipe Hint */}
      {isDraggable && !isFlying && showHint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 bg-black/80 dark:bg-white/90 text-white dark:text-black px-4 py-2 md:py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md border border-white/20 pointer-events-none"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider">Swipe</span>
          <motion.div
            animate={{ x: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.div>
        </motion.div>
      )}

      {/* Decorative inner glow */}
      <div className="absolute top-0 left-0 right-0 h-[60px] md:h-[150px] bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

      {/* Top Meta Info */}
      <div className="flex justify-start items-center text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-5 border-b border-black/5 pb-2 md:pb-4 gap-2">
        <span className="text-gray-600">{project.type}</span>
        <span className="opacity-40">|</span>
        <span className="opacity-70">{project.year}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-10 relative z-10">
        {/* Left: text */}
        <div className="flex-1 space-y-3 md:space-y-5 lg:space-y-8">
          <h3 className="text-base sm:text-xl md:text-2xl lg:text-[32px] xl:text-[36px] font-bold max-w-2xl leading-[1.15] text-black tracking-tight">
            {project.title}
          </h3>

          <div>
            <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-[1.4] max-w-[500px] mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
              {project.description}
            </p>

            {/* Buttons — always side by side */}
            <div className="flex flex-row flex-wrap gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="opacity-20">|</span>
                <span>Live Preview</span>
              </a>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 bg-white/40 border border-white/60 text-black rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg backdrop-blur-sm"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="opacity-20">|</span>
                <span>Source Code</span>
              </a>
            </div>
          </div>

          {/* Skills — mobile only */}
          <div className="relative z-10 flex md:hidden flex-col gap-2">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Built With</p>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, idx) => (
                <div key={idx} className="group/tool relative flex items-center justify-center p-1.5 sm:p-2 bg-white/40 border border-white/60 rounded-xl text-black hover:bg-white transition-colors" title={skill}>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover/tool:opacity-100 transition-opacity">
                    {getSkillIcon(skill)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: visual preview */}
        <div className="flex-[1.2] lg:flex-1 relative flex flex-col">
          <div className="w-full flex-1 bg-white rounded-[16px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[36px] shadow-lg border border-white/80 relative overflow-hidden flex flex-col pt-3 sm:pt-5 md:pt-6 lg:pt-8 px-3 sm:px-5 md:px-6 lg:px-8 items-center bg-gradient-to-tr from-gray-50 to-white min-h-[160px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[300px]">
            <div className="w-full max-w-xl space-y-1 sm:space-y-2 md:space-y-3 text-center flex-1 flex flex-col">
              <h4 className="text-sm sm:text-base md:text-lg font-bold text-black leading-tight tracking-tight px-1 shrink-0 z-10">
                {project.previewTitle}
              </h4>

              {/* MacBook Mockup */}
              <div className="relative flex-1 flex flex-col justify-end">
                <div className="select-none transition-transform duration-300 hover:-translate-y-1 mx-auto w-full max-w-[190px] sm:max-w-[260px] md:max-w-[240px] lg:max-w-[300px] xl:max-w-[380px]">
                  <div style={{ width: "100%", paddingTop: "57.875%", height: 0, position: "relative", margin: "auto" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%" }}>
                      {/* Screen lid */}
                      <div style={{
                        margin: "auto", background: "#111",
                        width: "81%", height: "94%",
                        borderTopLeftRadius: "2% 3%", borderTopRightRadius: "2% 3%",
                        borderBottomLeftRadius: "5% 3%", borderBottomRightRadius: "5% 3%",
                        boxSizing: "border-box", padding: "3%",
                        position: "relative", overflow: "hidden", border: "1px solid #ddd",
                      }}>
                        <div style={{ position: "absolute", right: "0.3%", top: "0.5%", width: "36.5%", height: "35%", border: "1px solid #666", borderBottom: "none", borderLeft: "none", borderTopRightRadius: "4.5% 7%", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", right: "-25%", top: "-25%", width: "40%", height: "150%", background: "linear-gradient(rgba(255,255,255,0.2), rgba(200,200,200,0) 40%)", transform: "rotate(-30deg)", pointerEvents: "none", zIndex: 2 }} />
                        <div style={{ background: "#333", borderRadius: "50%", width: "1%", height: "1.5%", position: "absolute", left: "49.5%", top: "2%" }}>
                          <div style={{ position: "absolute", left: "35%", top: "40%", width: "30%", height: "30%", borderRadius: "50%", background: "#777" }} />
                        </div>
                        <div style={{ width: "100%", height: "100%", background: "#111", overflow: "hidden" }}>
                          {project.previewImage && (
                            <img src={project.previewImage} alt="" className="w-full h-full object-cover object-top block" />
                          )}
                        </div>
                      </div>
                      {/* Bottom bar */}
                      <div style={{
                        background: "linear-gradient(#ccc 50%, #444)", width: "100%", height: "5%",
                        position: "relative", top: "-1.7%",
                        borderBottomLeftRadius: "6% 50%", borderBottomRightRadius: "6% 50%",
                        boxShadow: "1px 0px 8px 1px #333",
                      }}>
                        <div style={{ width: "100%", height: "50%", background: "linear-gradient(90deg, #aaa, #f3f3f3 0.5%, #aaa 2.5%, #f3f3f3 5.5%, #f3f3f3 94.5%, #aaa 97.5%, #f3f3f3 99.5%, #aaa)" }}>
                          <div style={{ background: "radial-gradient(90% 150% at 50% 1%, #eee 49%, #888)", margin: "auto", width: "15%", height: "60%", borderBottomLeftRadius: "8% 100%", borderBottomRightRadius: "8% 100%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills — md+ */}
          <div className="hidden md:flex items-center justify-between mt-4 lg:mt-6">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Built With</p>
              <div className="flex items-center gap-3">
                {project.skills.map((skill, idx) => (
                  <div key={idx} className="group/tool relative flex items-center justify-center p-2.5 bg-white/40 border border-white/60 rounded-2xl text-black hover:bg-white transition-all transform hover:-translate-y-1" title={skill}>
                    <div className="w-6 h-6 opacity-70 group-hover/tool:opacity-100 transition-opacity">
                      {getSkillIcon(skill)}
                    </div>
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tool:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
