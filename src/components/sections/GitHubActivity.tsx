"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitCommitHorizontal, GitPullRequest, FolderPlus } from "lucide-react";
import { SectionCornerMarks } from "@/components/ui/GridLines";
import type { ActivityItem } from "@/app/api/github/route";

function Skeleton() {
  return (
    <div className="space-y-6 max-w-3xl border-l-[2px] border-black/5 dark:border-white/5 ml-[19px] sm:ml-[23px] pl-6 sm:pl-8 py-4 min-h-[400px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="relative animate-pulse">
           <div className="absolute -left-[40px] sm:-left-[48px] top-0 w-7 h-7 rounded-full bg-black/5 dark:bg-white/5 shrink-0" />
           <div className="flex-1 space-y-4">
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-1/3" />
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-2/3" />
            <div className="h-4 bg-black/5 dark:bg-white/5 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GitHubActivity() {
  const [events, setEvents] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => setEvents(data.events ?? []))
      .finally(() => setLoading(false));
  }, []);

  const pushes = events.filter((e) => e.type === "push");
  const creates = events.filter((e) => e.type === "create");
  const prs = events.filter((e) => e.type === "pr");

  const totalCommits = pushes.reduce((acc, curr) => acc + (curr.commitCount || 0), 0);
  const maxCommit = pushes.length > 0 ? Math.max(...pushes.map(p => p.commitCount || 1), 1) : 1;

  return (
    <section id="github-activity" className="relative w-full overflow-hidden bg-white dark:bg-black py-16 md:py-24 border-b border-black/[0.12] dark:border-white/20">
      <SectionCornerMarks />

      {/* Align with max-w-5xl established across all sections */}
      <div className="px-4 md:px-8 max-w-5xl mx-auto font-sans min-h-[600px]">
        
        {/* Main Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 mb-6">
            <span className="text-xs">✦</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Activity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white leading-[1.1]">
            Shipping in public<br />
            <span className="text-gray-400 dark:text-gray-500 font-medium italic">& always building</span>
          </h2>
        </motion.div>

        {/* Timeline Inner Header */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="mb-8"
        >
          <span className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 font-sans">Contribution activity</span>
        </motion.div>

        {loading ? (
          <Skeleton />
        ) : events.length === 0 ? (
           <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-gray-500 py-8">
             No recent public activity found.
           </motion.p>
        ) : (
          <div className="max-w-3xl">
            {/* Timeline Header (Month) */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="flex items-center gap-4 mb-4"
            >
              <span className="text-xs font-semibold text-gray-900 dark:text-white shrink-0">
                {new Date().toLocaleString("default", { month: "long", year: "numeric" })}
              </span>
              <div className="flex-1 h-px bg-black/[0.08] dark:bg-white/[0.08]" />
            </motion.div>

            <div className="relative pl-7 sm:pl-8">
              {/* Vertical Line spanning entire activity height */}
              <div className="absolute left-[13px] sm:left-[15px] top-6 bottom-0 w-[2px] bg-black/[0.08] dark:bg-white/[0.08]" />

              <div className="space-y-12 pt-4 pb-6">
                
                {/* PUSHES GROUP */}
                {pushes.length > 0 && (
                  <motion.div 
                     initial={{ opacity: 0, x: -10 }} 
                     whileInView={{ opacity: 1, x: 0 }} 
                     viewport={{ once: true }} 
                     transition={{ duration: 0.4 }}
                     className="relative"
                  >
                    <div className="absolute -left-[38px] sm:-left-[42px] top-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-[#161b22] border-[3px] border-white dark:border-black flex items-center justify-center shrink-0 z-10 text-gray-500 dark:text-gray-400 shadow-sm">
                      <GitCommitHorizontal className="w-3.5 h-3.5" />
                    </div>

                    <div className="mb-4">
                      <h4 className="text-[14px] text-gray-900 dark:text-white flex items-center justify-between font-semibold sm:font-normal">
                        <span>Created {totalCommits} commits in {pushes.length} repositor{pushes.length > 1 ? "ies" : "y"}</span>
                        <div className="hidden sm:flex text-gray-400">
                           <svg className="w-4 h-4 translate-y-px" viewBox="0 0 16 16" fill="currentColor"><path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path></svg>
                        </div>
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {pushes.map((push, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-[13px] gap-2 sm:gap-4">
                          <div className="flex items-center gap-2 truncate max-w-full">
                            <a href={`https://github.com/${push.repo}`} target="_blank" rel="noreferrer" className="text-[#0969da] dark:text-[#58a6ff] hover:underline font-semibold flex-shrink-0">
                              {push.repoShort}
                            </a>
                            <span className="text-gray-500 dark:text-[#8b949e] whitespace-nowrap hidden sm:inline">{push.commitCount} commits</span>
                          </div>
                          
                          <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                             <span className="text-gray-500 dark:text-[#8b949e] whitespace-nowrap sm:hidden flex-1">{push.commitCount} commits</span>
                             <div className="w-[100px] md:w-[140px] h-[10px] rounded-full bg-transparent shrink-0">
                               <div className="h-full bg-[#1a7f37] dark:bg-[#2da44e] rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.max(8, ((push.commitCount || 1) / maxCommit) * 100)}%` }} />
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* CREATES GROUP */}
                {creates.length > 0 && (
                  <motion.div 
                     initial={{ opacity: 0, x: -10 }} 
                     whileInView={{ opacity: 1, x: 0 }} 
                     viewport={{ once: true }} 
                     transition={{ duration: 0.4, delay: 0.1 }}
                     className="relative"
                  >
                    <div className="absolute -left-[38px] sm:-left-[42px] top-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-[#161b22] border-[3px] border-white dark:border-black flex items-center justify-center shrink-0 z-10 text-gray-500 dark:text-gray-400 shadow-sm">
                      <FolderPlus className="w-3.5 h-3.5" />
                    </div>

                    <div className="mb-4">
                      <h4 className="text-[14px] text-gray-900 dark:text-white flex items-center justify-between font-semibold sm:font-normal">
                        <span>Created {creates.length} repositor{creates.length > 1 ? "ies" : "y"}</span>
                        <div className="hidden sm:flex text-gray-400">
                           <svg className="w-4 h-4 translate-y-px" viewBox="0 0 16 16" fill="currentColor"><path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z"></path></svg>
                        </div>
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {creates.map((create, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between text-[13px] gap-2">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-gray-400 dark:text-[#8b949e] shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5z"></path></svg>
                            <a href={`https://github.com/${create.repo}`} target="_blank" rel="noreferrer" className="text-[#0969da] dark:text-[#58a6ff] hover:underline font-semibold truncate">
                              {create.repoShort}
                            </a>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 text-gray-500 dark:text-[#8b949e]">
                            {create.language && (
                              <span className="flex items-center gap-1.5 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: create.languageColor ?? '#8b949e' }} />
                                {create.language}
                              </span>
                            )}
                            <span className="text-right tabular-nums whitespace-nowrap text-[12px] sm:text-[13px]">
                              {new Date(create.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PR GROUP */}
                {prs.slice(0, 1).map((pr, idx) => (
                  <motion.div 
                     key={idx} 
                     initial={{ opacity: 0, x: -10 }} 
                     whileInView={{ opacity: 1, x: 0 }} 
                     viewport={{ once: true }} 
                     transition={{ duration: 0.4, delay: 0.2 }}
                     className="relative"
                  >
                    <div className="absolute -left-[38px] sm:-left-[42px] top-0 w-7 h-7 rounded-full bg-gray-100 dark:bg-[#161b22] border-[3px] border-white dark:border-black flex items-center justify-center shrink-0 z-10 text-gray-500 dark:text-gray-400 shadow-sm">
                      <GitPullRequest className="w-3.5 h-3.5" />
                    </div>

                    <div className="mb-4">
                      <h4 className="text-[14px] text-gray-900 dark:text-white flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 font-semibold sm:font-normal">
                        <span className="leading-relaxed">
                          Created a pull request in{" "}
                          <a href={`https://github.com/${pr.repo}`} target="_blank" rel="noreferrer" className="font-semibold text-gray-900 dark:text-white hover:text-[#0969da] dark:hover:text-[#58a6ff] hover:underline whitespace-nowrap">
                            {pr.repoShort}
                          </a>
                        </span>
                        <span className="text-gray-500 dark:text-[#8b949e] shrink-0 text-[12px] sm:text-[13px] tabular-nums">
                          {new Date(pr.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </h4>
                    </div>

                    <div className="border border-black/[0.08] dark:border-[#30363d] rounded-[6px] p-4 bg-transparent outline-none hover:border-black/20 dark:hover:border-white/20 transition-colors w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-[#8250df] dark:text-[#a371f7] shrink-0" viewBox="0 0 16 16" fill="currentColor"><path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm6 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path></svg>
                        <span className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                           {pr.description.replace(/^((?:merged|opened|closed) PR:\s+)/i, "") || "Feature updates"}
                        </span>
                      </div>
                      {(pr.prAdditions !== undefined || pr.prDeletions !== undefined) && (
                        <div className="flex flex-wrap items-center gap-2 text-[12px] text-gray-600 dark:text-[#8b949e] mt-2">
                          {pr.prAdditions !== undefined && <span className="text-[#1a7f37] dark:text-[#3fb950] font-medium">+{pr.prAdditions}</span>}
                          {pr.prDeletions !== undefined && <span className="text-[#d1242f] dark:text-[#f85149] font-medium">-{pr.prDeletions}</span>}
                          {!!pr.prComments && <span>{pr.prComments} comment{pr.prComments !== 1 ? 's' : ''}</span>}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

              </div>
            </div>
            
          </div>
        )}
      </div>
    </section>
  );
}
