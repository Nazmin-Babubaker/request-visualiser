import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Zap } from 'lucide-react';

const PlanetStats = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      className="space-y-4"
    >
      {/* 1. Target Coordinates Card */}
      <div className="glass-card p-6 rounded-3xl border-l-4 border-pop-cyan relative overflow-hidden">
        <div className="absolute top-2 right-4 opacity-10">
          <Globe size={40} className="text-pop-cyan" />
        </div>
        <p className="font-silkscreen text-[10px] text-pop-cyan uppercase mb-1">Target_Coords</p>
        <p className="text-xl font-black text-white truncate drop-shadow-sm">{data.hostname}</p>
        <p className="font-mono text-[11px] text-white/50 tracking-tighter">{data.ipAddress}</p>
      </div>

      {/* 2. Server & Provider Card (New!) */}
      <div className="glass-card p-6 rounded-3xl border-l-4 border-white/20 bg-white/5 relative">
        <p className="font-silkscreen text-[10px] text-pop-purple uppercase mb-2">Satellite_Hardware</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40 font-bold uppercase">Provider</span>
            <span className="text-xs font-black text-white bg-pop-purple/20 px-2 py-0.5 rounded-md border border-pop-purple/30">
              {data.server?.provider || "Unknown"}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40 font-bold uppercase">Type</span>
            <span className="text-xs font-bold text-pop-cyan">{data.server?.type}</span>
          </div>

          <div className="pt-2 border-t border-white/5">
             <p className="text-[9px] text-white/30 font-medium mb-1 uppercase tracking-tighter">Signal_Authority</p>
             <p className="text-[10px] text-white/70 truncate italic">"{data.location?.org}"</p>
          </div>
        </div>
      </div>

      {/* 3. Atmosphere Protocol Card */}
      <div className="glass-card p-6 rounded-3xl border-l-4 border-pop-pink">
        <p className="font-silkscreen text-[10px] text-pop-pink uppercase mb-1">Link_Protocol</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-black text-white italic">{data.protocol.replace(':', '').toUpperCase()}</p>
          <p className="text-[10px] font-black text-pop-pink animate-pulse">v{data.httpVersion}</p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Connection_Stable</p>
        </div>
      </div>

      {/* 4. Engine Latency (Main Stat) */}
      <div className="bg-gradient-to-br from-pop-purple via-pop-pink to-pop-purple p-6 rounded-3xl shadow-lg shadow-pop-purple/20 relative group overflow-hidden">
        {/* Animated Background Shine */}
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <p className="font-silkscreen text-[10px] text-white/80 uppercase mb-1">Engine_Latency</p>
        <div className="flex justify-between items-end relative z-10">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-white leading-none tracking-tighter">
              {Math.round(data.journey.totalMs)}
            </span>
            <span className="font-silkscreen text-xs text-white/60">ms</span>
          </div>
          <Zap size={24} className="text-white animate-bounce fill-current" />
        </div>
      </div>
    </motion.div>
  );
};

export default PlanetStats;