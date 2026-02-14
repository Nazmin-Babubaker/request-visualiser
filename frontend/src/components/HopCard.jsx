import React from 'react';
import { motion } from 'framer-motion';

const HopCard = ({ hop, delay }) => (
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: delay, duration: 0.5 }}
    className="relative flex items-start gap-6 mb-8 group"
  >
    {/* The Path Line */}
    <div className="absolute left-4 top-10 bottom-[-2rem] w-0.5 bg-cyan-400/20 group-last:hidden" />
    
    {/* The Glowing Node */}
    <div className="relative z-10">
      <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_#22d3ee]">
        <span className="text-[10px] font-bold text-cyan-400">{hop.id}</span>
      </div>
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute inset-0 rounded-full bg-cyan-400"
      />
    </div>

    {/* The Data Card */}
    <div className="flex-1 bg-slate-900/50 border border-white/5 p-4 rounded-lg backdrop-blur-sm hover:border-cyan-400/40 transition-colors">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-cyan-400 font-mono text-xs tracking-tighter uppercase">{hop.label}</h3>
        <span className="text-[10px] font-mono text-slate-500">{hop.latency}ms</span>
      </div>
      <p className="text-slate-400 text-[11px] font-sans leading-tight">
        {hop.description}
      </p>
      
      {/* Visual Bar */}
      <div className="mt-3 w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: delay + 0.3, duration: 0.8 }}
          className="h-full bg-cyan-400"
        />
      </div>
    </div>
  </motion.div>
);

export default HopCard;