import React, { useState } from 'react';
import { Rocket, ShieldAlert, Globe, Loader2, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PlanetStats from './components/PlanetStats';
import StellarMap from './components/StellarMap';
import MissionTrajectory from './components/MissionTrajectory';

export default function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const launchProbe = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('http://localhost:3000/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error('Satellite Link Failed');
      const result = await response.json();
      console.log(result)
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="starfield min-h-screen flex flex-col items-center justify-start pt-20 p-4">
      {/* Header */}
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-5xl font-black text-space-cyan tracking-tighter italic">DATA ODYSSEY</h1>
        <p className="text-xs font-mono text-cyan-500/60 mt-2 uppercase tracking-[0.3em]">Interstellar Network Probe v4.0</p>
      </motion.header>

      {/* Input */}
      <motion.form onSubmit={launchProbe} className="w-full max-w-xl relative group mb-8">
        <div className="absolute -inset-1 bg-space-cyan/20 rounded-lg blur group-focus-within:bg-space-cyan/40 transition" />
        <div className="relative flex bg-space-900 border border-space-cyan/30 rounded-lg overflow-hidden">
          <div className="flex items-center justify-center px-4 border-r border-space-cyan/20">
            <Globe className="w-5 h-5 text-space-cyan/50" />
          </div>
          <input 
            type="text" value={url} onChange={(e) => setUrl(e.target.value)}
            placeholder="ENTER DESTINATION URL"
            className="flex-1 bg-transparent p-4 outline-none font-mono text-sm placeholder:text-slate-600"
          />
          <button disabled={loading} className="bg-space-cyan text-space-950 px-6 font-bold flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50 cursor-pointer">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Rocket className="w-5 h-5" />}
            {loading ? 'LAUNCHING...' : 'LAUNCH'}
          </button>
        </div>
      </motion.form>

      {/* Results */}
      <AnimatePresence>
        {data && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full max-w-5xl">
            
            {/* 1. Radar Map */}
            <div className="mb-12">
               <StellarMap location={data?.location} stats={data?.journey} />
            </div>

            {/* 2. Horizontal Flowchart */}
            <MissionTrajectory hops={data?.hops} />

            {/* 3. Detailed Logs & Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Refined Telemetry Logs (Black Box Style) */}
              <div className="md:col-span-2 bg-slate-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-md">
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <h2 className="text-xs font-mono text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
                    <Terminal size={14} className="text-space-cyan" />
                    Live Flight Telemetry
                  </h2>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
                </div>

                <div className="space-y-4">
                  {data?.hops?.map((hop, index) => (
                    <motion.div 
                      key={hop.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="group flex font-mono text-[11px] py-3 border-b border-white/5 hover:bg-space-cyan/5 transition-colors px-2 rounded-sm"
                    >
                      <span className="text-space-cyan w-16 shrink-0">[{hop.latency}ms]</span>
                      <span className="text-slate-200 uppercase w-40 shrink-0 font-bold tracking-tight">{hop.label}</span>
                      <span className="text-slate-500 flex-1 truncate italic opacity-70 group-hover:opacity-100 transition-opacity">
                        {`>> ${hop.description}`}
                      </span>
                      <span className="text-space-cyan ml-2 opacity-40">OK_SIGNAL</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-600 uppercase">
                  <span>Packet Loss: 0%</span>
                  <span>Encryption: TLS_AES_256_GCM</span>
                  <span>Signal: Stable</span>
                </div>
              </div>

              {/* Technical Stats */}
              <PlanetStats data={data} />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {!data && !loading && (
        <p className="mt-12 text-slate-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
          Standing by for coordinates...
        </p>
      )}
    </div>
  );
}