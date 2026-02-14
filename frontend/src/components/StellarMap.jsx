import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Navigation } from 'lucide-react';

export default function StellarMap({ location, stats }) {
  const totalTime = stats?.totalMs || "0ms";
  const city = location?.city || "Cute Sector";
  
  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto border-2 border-pop-pink/20 rounded-full bg-white/5 flex items-center justify-center shadow-[0_0_50px_rgba(255,113,206,0.1)] overflow-hidden">
      
      {/* Radar Circles */}
      <div className="absolute inset-0 border border-white/5 rounded-full" />
      <div className="absolute inset-[25%] border border-white/10 rounded-full" />
      <div className="absolute inset-[45%] border border-white/20 rounded-full" />
      
      {/* FIXED: Radar Sweeper using Conic Gradient */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, rgba(255, 113, 206, 0.4) 0deg, rgba(255, 113, 206, 0) 90deg)',
          maskImage: 'radial-gradient(circle, black 0%, black 100%)', // Keeps it crisp
        }}
      />

      {/* Crosshair Lines for that Gamer feel */}
      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5 -translate-x-1/2" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2" />

      {/* Center Icon (The Home Base) */}
      <div className="relative z-20">
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff]" />
        <div className="absolute inset-0 w-4 h-4 bg-white rounded-full animate-ping opacity-50" />
      </div>

      {/* Target Location (The Heart) */}
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }}
        className="absolute top-[30%] right-[25%] flex flex-col items-center z-20"
      >
        <Heart className="text-pop-pink fill-pop-pink animate-pulse w-6 h-6 filter drop-shadow-[0_0_8px_#ff71ce]" />
        <div className="bg-pop-pink px-3 py-1 rounded-lg mt-2 shadow-lg">
          <p className="font-silkscreen text-[10px] font-black text-white whitespace-nowrap uppercase italic">
            {city}
          </p>
        </div>
      </motion.div>

      {/* Bottom Status Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <div className="inline-flex items-center gap-2 px-1 py-1 bg-space-black border border-pop-cyan rounded-full shadow-[0_0_20px_rgba(1,205,254,0.4)]">
          <Navigation size={12} className="text-pop-cyan fill-current rotate-45" />
          <span className="font-silkscreen text-[11px] font-black text-pop-cyan tracking-widest uppercase">
            PING: {totalTime}ms
          </span>
        </div>
      </div>
    </div>
  );
}