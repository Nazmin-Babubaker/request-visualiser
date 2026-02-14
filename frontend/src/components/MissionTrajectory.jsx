import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Satellite, ShieldCheck, Zap, Database } from 'lucide-react';

const icons = [Satellite, Zap, ShieldCheck, Database];

export default function MissionTrajectory({ hops }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="w-full py-16 px-4 mb-16 bg-slate-900/20 border-y border-white/5 relative overflow-visible rounded-xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[10px] font-mono text-space-cyan uppercase tracking-[0.4em] mb-16 text-center">
          Signal Trajectory Visualization
        </h2>

        <div className="relative flex justify-between items-center">
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-space-cyan/10 -translate-y-1/2" />
          
          {/* Animated Progress Line */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-space-cyan to-fuchsia-500 -translate-y-1/2 shadow-[0_0_15px_#22d3ee]"
          />

          {hops?.map((hop, index) => {
            const Icon = icons[index] || Satellite;
            return (
              <div key={hop.id} className="relative flex flex-col items-center">
                {/* Node Station */}
                <motion.button
                  onMouseEnter={() => setHoveredNode(hop.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.3 }}
                  className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                    hoveredNode === hop.id 
                    ? 'bg-space-cyan text-slate-950 scale-125 shadow-[0_0_20px_#22d3ee] border-white' 
                    : 'bg-slate-950 border-space-cyan/50 text-space-cyan'
                  }`}
                >
                  <Icon size={20} />
                  
                  {/* Tooltip Popup */}
                  <AnimatePresence>
                    {hoveredNode === hop.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute bottom-full mb-6 w-56 p-4 bg-slate-900 border border-space-cyan/50 rounded-lg shadow-2xl pointer-events-none z-50 text-left"
                      >
                        <p className="text-space-cyan font-mono text-[10px] uppercase mb-1 tracking-wider">{hop.label}</p>
                        <p className="text-slate-300 text-[11px] leading-relaxed font-sans">
                          {hop.description}
                        </p>
                        <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-center">
                          <span className="text-[9px] text-slate-500 font-mono uppercase">Node Latency</span>
                          <span className="text-[10px] text-space-cyan font-mono font-bold">{hop.latency}ms</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <span className="mt-6 text-[9px] font-mono text-slate-500 uppercase tracking-widest absolute top-10 whitespace-nowrap">
                  Step 0{hop.id}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}