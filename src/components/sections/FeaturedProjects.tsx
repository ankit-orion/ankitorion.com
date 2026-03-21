"use client";

import { 
  ArrowRight, 
  MoveRight, 
  Atom, 
  Database, 
  Server, 
  Cpu, 
  Layers, 
  Layout, 
  Code, 
  Zap, 
  Cloud, 
  Box, 
  Terminal,
  Container,
  Globe,
  Github,
  Link as LinkIcon
} from "lucide-react";
import { useRef, useState } from "react";
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
    color: "bg-[#e0efff]", // Light blue
    shadow: "shadow-blue-200/50",
    previewTitle: "Interactive Coding Platform",
    previewImage:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600",
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
    color: "bg-[#efe4ff]", // Light lavender
    shadow: "shadow-purple-200/50",
    previewTitle: "Agency Client Dashboard",
    previewImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
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
    color: "bg-[#e4ffdf]", // Light green
    shadow: "shadow-green-200/50",
    previewTitle: "Global Edge Network Dashboard",
    previewImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600",
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
    color: "bg-[#fff8df]", // Light cream
    shadow: "shadow-yellow-200/40",
    previewTitle: "Real-time Infinite Canvas",
    previewImage:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=600",
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;


  const [flyingCards, setFlyingCards] = useState<{ id: number; dir: number }[]>(
    [],
  );
  const [swipes, setSwipes] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.7) {
      setShowHint(true);
    } else {
      setShowHint(false);
      // Reset the stack gracefully if the user scrolls significantly back up into the previous sections
      if (latest < 0.5 && swipes > 0 && flyingCards.length === 0) {
        setSwipes(0);
      }
    }
  });

  const total = projects.length;
  // Determine which card index is conceptually at the very front of the deck
  const frontIndex = (total - 1 - (swipes % total) + total) % total;

  // The active card is draggable.
  const activeCardIndex = frontIndex;

  const handleSwipe = (index: number, dir: number) => {
    setFlyingCards((prev) => [...prev, { id: index, dir }]);
    // Use a small delay for state update to keep animations fluid
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
      className="relative w-full border-b border-black/[0.04] dark:border-white/10 overflow-x-clip isolate"
    >
      <SectionCornerMarks />

      <div className="pt-12 md:pt-24 pb-20 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-10 md:mb-20 text-gray-800 dark:text-gray-200 tracking-tight leading-tight">
          Some <span className="font-bold text-black dark:text-white italic">Of My</span>{" "}
          Featured Project
        </h2>

        <div className="relative">
          {projects.map((project, i) => {
            const effectiveCardsAbove = (frontIndex - i + total) % total;
            const isFlying = flyingCards.some((c) => c.id === i);

            return (
              <div
                key={project.id}
                className="sticky flex justify-center w-full"
                style={{
                  // ALL cards get the EXACT same top value. This ensures they all
                  // un-stick at the exact same moment at the bottom of the section,
                  // completely fixing the "background cards leaking down" issue.
                  top: isMobile ? `calc(env(safe-area-inset-top, 0px) + 20px)` : `calc(env(safe-area-inset-top, 0px) + 60px)`,
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

          <div className="h-[100vh] md:h-[150vh] pointer-events-none" />
        </div>
      </div>
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

  // Dynamic scale: freeze at 1 while flying so it flies out straight
  const targetScale = isFlying ? 1 : 1 - effectiveCardsAbove * 0.04;
  const rawScale = useTransform(
    progress,
    [start, start + 0.15, 1],
    [1, 1, targetScale],
  );
  // useSpring smoothes the snap when a card is dismissed
  const scale = useSpring(rawScale, { stiffness: 200, damping: 20 });

  // Dynamic stagger based on stack depth with smaller scale for mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const isSmallHeight = typeof window !== 'undefined' && window.innerHeight < 700;
  
  const staggerY = isMobile ? 12 : 24;
  const stackPositions = total - 1;
  const frozenEffectiveCards = isFlying ? 0 : effectiveCardsAbove;
  const visualStagger = (stackPositions - frozenEffectiveCards) * staggerY;
  
  // Transitions optimized for flick speed on mobile
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
        if (isFlying) {
          onAnimationComplete();
        }
      }}
      animate={
        isFlying
          ? {
              x: `${swipeDirection * 150}vw`,
              opacity: 0,
              rotate: swipeDirection * 15,
              y: visualStagger,
              transitionEnd: { x: 0, rotate: 0 },
            }
          : { x: 0, opacity: 1, rotate: 0, y: visualStagger }
      }
      transition={{ type: "spring", stiffness: 350, damping: 40 }}
      // Fixing transform origin to the top ensures that when cards scale up, they don't 'bob' vertically
      style={{
        scale,
        transformOrigin: "top center",
      }}
      className={`relative w-full mx-auto max-w-3xl rounded-[30px] sm:rounded-[40px] md:rounded-[44px] p-5 sm:p-6 md:p-8 ${project.color} ${project.shadow} shadow-2xl overflow-hidden border border-white/40 ring-1 ring-black/5 flex flex-col max-h-[70vh] sx:max-h-[75vh] sm:max-h-[80vh] md:max-h-[80vh] lg:max-h-[76vh] xl:max-h-[80vh] ${isDraggable ? "cursor-grab active:cursor-grabbing" : ""}`}
    >
      {/* Swipe Hint */}
      {isDraggable && !isFlying && showHint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 bg-black/80 dark:bg-white/90 text-white dark:text-black px-4 py-2 md:py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md border border-white/20 pointer-events-none"
        >
          <span className="text-xs md:text-sm uppercase tracking-wider">
            Swipe
          </span>
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
      <div className="flex justify-start items-center text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 sm:mb-8 border-b border-black/5 pb-2 md:pb-4 gap-2">
        <span className="text-gray-600">{project.type}</span>
        <span className="opacity-40">|</span>
        <span className="opacity-70">{project.year}</span>
      </div>

      <div className="flex flex-col xl:flex-row gap-4 sm:gap-10 relative z-10">
        <div className="flex-1 space-y-4 sm:space-y-8">
          {/* Title and Action Button */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6">
            <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[36px] font-bold max-w-2xl leading-[1.15] text-black tracking-tight">
              {project.title}
            </h3>
          </div>

          {/* Description Section */}
          <div className="pb-3 md:pb-0">
             <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium leading-[1.4] max-w-[500px] mb-6">
                {project.description}
             </p>
             
             {/* Action Buttons */}
             <div className="flex flex-wrap gap-3">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
                >
                  <Globe className="w-4 h-4" />
                  <span className="opacity-20">|</span>
                  <span>Live Preview</span>
                </a>
                <a 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-5 py-2.5 bg-white/40 border border-white/60 text-black rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg backdrop-blur-sm"
                >
                  <Github className="w-4 h-4" />
                  <span className="opacity-20">|</span>
                  <span>Source Code</span>
                </a>
             </div>
          </div>

          <div className="relative z-10 flex xl:hidden flex-col gap-2">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
              Built With
            </p>
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

        {/* Visual Preview */}
        <div className="flex-[1.2] lg:flex-1 relative mt-2 md:mt-0 flex flex-col">
          <div className="w-full flex-1 bg-white rounded-[20px] sm:rounded-[32px] md:rounded-[36px] shadow-lg border border-white/80 relative overflow-hidden flex flex-col pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8 items-center bg-gradient-to-tr from-gray-50 to-white min-h-[200px] sm:min-h-[260px] md:min-h-[260px] lg:min-h-[300px]">
            <div className="w-full max-w-xl space-y-1.5 md:space-y-3 text-center md:flex-1 md:flex md:flex-col">
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-black leading-tight tracking-tight px-1 shrink-0 z-10">
                {project.previewTitle}
              </h4>

              {/* Standard spacing on mobile, but flex-1 push to bottom on desktop to prevent height bleeding */}
              <div className="relative mt-1 md:mt-3 group pb-4 md:pb-4 md:flex-1 md:flex md:flex-col md:justify-end">
                {/* Size enforced by WIDTH on mobile exactly as requested, but by HEIGHT on laptops and up */}
                <div className="w-[100px] sx:w-[130px] sm:w-[150px] md:w-auto md:h-[210px] lg:h-[240px] xl:h-[260px] aspect-[9/19] bg-black rounded-[15px] sx:rounded-[20px] sm:rounded-[30px] md:rounded-[24px] border-[3px] sm:border-[6px] md:border-[6px] border-[#0c0c0c] mx-auto shadow-[0_15px_40px_rgba(0,0,0,0.15)] md:shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden relative shrink-0 transition-transform duration-300 hover:-translate-y-2">
                  <img
                    src={project.previewImage}
                    alt={project.previewTitle}
                    className="w-full h-full object-cover"
                  />
                  {/* Notch dimensions matching mobile/desktop logic */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sx:w-16 md:w-[35%] h-2 sx:h-4 md:h-[10px] bg-black rounded-b-xl md:rounded-b-[8px] z-20"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center justify-between mt-6">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
                Built With
              </p>
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
