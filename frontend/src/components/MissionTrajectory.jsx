import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Moon, Sun, Cloud, Timer } from 'lucide-react';

const icons = [Star, Moon, Sun, Cloud];

export default function MissionTrajectory({ hops }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="w-full py-12 px-4 glass-card rounded-[40px] relative overflow-visible mt-8">
      <div className="max-w-4xl mx-auto">
        <p className="font-silkscreen text-[10px] font-black text-pop-purple uppercase tracking-[0.5em] mb-12 text-center">
          Connection_Journey 
        </p>

        <div className="relative flex justify-between items-center px-8">
          {/* Background Track */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full" />
          
          {/* Glowing Progress Line */}
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: '100%' }}
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-pop-cyan via-pop-purple to-pop-pink -translate-y-1/2 shadow-[0_0_15px_#ff71ce]"
          />

          {hops?.map((hop, index) => {
            const Icon = icons[index % icons.length];
            const isHovered = hoveredNode === hop.id;
            
            return (
              <div key={hop.id} className="relative">
                <motion.button
                  onMouseEnter={() => setHoveredNode(hop.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isHovered 
                    ? 'bg-white text-pop-pink scale-125 shadow-[0_0_25px_#fff] ' 
                    : 'bg-space-black border-2 border-pop-purple/50 text-pop-purple hover:border-pop-pink'
                  }`}
                >
                  <Icon size={24} className={isHovered ? 'fill-current' : ''} />
                  
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute bottom-full mb-6 w-52 p-4 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 text-left border-b-8 border-pop-pink"
                      >
                        {/* Header with Title */}
                        <p className="font-silkscreen text-pop-pink text-[9px] uppercase mb-1 italic tracking-tighter">
                          {hop.label}
                        </p>
                        
                        {/* Description */}
                        <p className="text-space-black text-[11px] font-bold leading-tight mb-3">
                          {hop.description}
                        </p>

                        {/* NEW: Time/Latency Section */}
                        <div className="flex items-center justify-between pt-2 border-t border-pop-pink/10">
                          <div className="flex items-center gap-1">
                            <Timer size={12} className="text-pop-purple" />
                            <span className="font-silkscreen text-[8px] text-pop-purple uppercase">Travel_Time</span>
                          </div>
                          <span className="font-silkscreen text-[10px] text-pop-pink font-bold">
                            {hop.latency}ms
                          </span>
                        </div>

                        {/* Decorative Pixel Corner */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                
                {/* Step Marker underneath */}
                <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 font-silkscreen text-[8px] transition-colors duration-300 ${isHovered ? 'text-pop-cyan' : 'text-white/20'}`}>
                  0{index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}