import React from 'react';

export function GlobalGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none flex justify-center z-40">
      <div className="w-full max-w-7xl h-full border-l border-r border-black/[0.04] dark:border-white/10" />
    </div>
  );
}

export function SectionCornerMarks() {
  return (
    <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex justify-center z-50">
      <div className="w-full max-w-7xl h-full relative">
        {/* Top Left */}
        <div className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-black/20 dark:bg-white/40" />
          <div className="absolute h-full w-[1px] bg-black/20 dark:bg-white/40" />
        </div>
        
        {/* Top Right */}
        <div className="absolute top-0 right-0 w-4 h-4 translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-black/20 dark:bg-white/40" />
          <div className="absolute h-full w-[1px] bg-black/20 dark:bg-white/40" />
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 w-4 h-4 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-black/20 dark:bg-white/40" />
          <div className="absolute h-full w-[1px] bg-black/20 dark:bg-white/40" />
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-4 h-4 translate-x-1/2 translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-black/20 dark:bg-white/40" />
          <div className="absolute h-full w-[1px] bg-black/20 dark:bg-white/40" />
        </div>
      </div>
    </div>
  );
}
