import React from 'react';
import { motion } from 'framer-motion';

const PlanetStats = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="border border-cyan-400/20 bg-cyan-400/5 p-4 rounded-lg">
        <p className="text-[10px] font-mono text-cyan-400/60 uppercase mb-2">Destination Planet</p>
        <p className="text-xl font-bold truncate">{data.hostname}</p>
        <p className="text-xs font-mono text-slate-400">{data.ipAddress}</p>
      </div>

      <div className="border border-white/10 bg-white/5 p-4 rounded-lg">
        <p className="text-[10px] font-mono text-slate-500 uppercase mb-2">Atmosphere / Protocol</p>
        <p className="text-lg font-mono text-fuchsia-400">{data.protocol.toUpperCase()}</p>
        <p className="text-[10px] text-slate-500 mt-1">HTTP v{data.httpVersion || '1.1'}</p>
      </div>

      <div className="border border-white/10 bg-white/5 p-4 rounded-lg">
        <p className="text-[10px] font-mono text-slate-500 uppercase mb-2">Engine Performance</p>
        <div className="flex justify-between items-end">
          <span className="text-2xl font-black">{Math.round(data.journey.totalMs)}</span>
          <span className="text-xs font-mono text-slate-500 mb-1">ms Total</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanetStats;