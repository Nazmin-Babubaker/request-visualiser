import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function StellarMap({ location, stats }) {
  // Defensive checks: If stats is missing, we provide empty defaults

  const totalTime = stats?.totalMs || "0ms";
  const city = location?.city || "Unknown Sector";
  const country = location?.country || "Deep Space";
  
  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto mb-12 border border-cyan-400/20 rounded-full bg-cyan-400/5 flex items-center justify-center overflow-hidden">
      
      {/* Radar Grid Circles */}
      <div className="absolute inset-4 border border-cyan-400/10 rounded-full" />
      <div className="absolute inset-20 border border-cyan-400/10 rounded-full" />
      <div className="absolute inset-40 border border-cyan-400/10 rounded-full" />
      
      {/* Radar Sweeper Animation */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left bg-linear-to-tr from-cyan-400/20 to-transparent border-l border-cyan-400/30"
      />

      {/* Mission Control (Center) */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
        <span className="text-[8px] font-mono text-white/50 mt-1 uppercase tracking-tighter">Probe Origin</span>
      </div>

      {/* Detected Planet (The Target) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="absolute top-1/4 right-1/4 flex flex-col items-center z-20"
      >
        <MapPin className="text-cyan-400 animate-bounce w-5 h-5" />
        <div className="bg-slate-950/80 border border-cyan-400 px-2 py-1 rounded mt-1">
          <p className="text-[10px] font-mono font-bold text-cyan-400 whitespace-nowrap">
            {city}, {country}
          </p>
         
        </div>
      </motion.div>

      {/* Distance Overlay */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded-full">
          <Navigation size={10} className="text-cyan-400 rotate-45" />
          <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
            Travel Time: {totalTime}
          </span>
        </div>
      </div>
    </div>
  );
}