import React from 'react';

export function GlobalGrid() {
  return (
    <div className="fixed top-20 md:top-24 bottom-0 inset-x-0 pointer-events-none flex justify-center z-40">
      <div className="w-full max-w-5xl h-full border-l border-r border-black/[0.12] dark:border-white/20" />
    </div>
  );
}

export function SectionCornerMarks() {
  return (
    <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex justify-center z-50">
      <div className="w-full max-w-5xl h-full relative border-b border-black/[0.12] dark:border-white/20">
        {/* Top Left */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-[2px] border-l-[2px] border-black/50 dark:border-white/70 -mt-[1px] -ml-[1px]" />
        
        {/* Top Right */}
        <div className="absolute top-0 right-0 w-3 h-3 border-t-[2px] border-r-[2px] border-black/50 dark:border-white/70 -mt-[1px] -mr-[1px]" />

        {/* Bottom Left */}
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[2px] border-l-[2px] border-black/50 dark:border-white/70 -mb-[1px] -ml-[1px]" />

        {/* Bottom Right */}
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[2px] border-r-[2px] border-black/30 dark:border-white/50 -mb-[1px] -mr-[1px]" />
      </div>
    </div>
  );
}
