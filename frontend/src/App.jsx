import React, { useState } from 'react';
import { Sparkles, ShieldAlert, Globe, Loader2, Heart } from 'lucide-react';
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
      const response = await fetch('http://localhost:5001/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!response.ok) throw new Error('Link Severed, Bestie!');
      const result = await response.json();
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
      <motion.header initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-12">
<h1 className="font-silkscreen text-6xl font-bold text-white tracking-widest drop-shadow-[4px_4px_0px_#ff71ce] hover:drop-shadow-[4px_4px_0px_#01cdfe] transition-all duration-300">RequestScope
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Sparkles size={14} className="text-pop-cyan animate-pulse" />
          <p className="text-[10px] font-bold text-pop-cyan/80 uppercase tracking-[0.4em]">Explore the universe behind your URL.</p>
          <Sparkles size={14} className="text-pop-cyan animate-pulse" />
        </div>
      </motion.header>

      {/* Input */}
<motion.form 
  onSubmit={launchProbe} 
  className="w-full max-w-xl relative group mb-12"
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
>
  {/* The Glowing "Aura" */}
  <div className="absolute -inset-1 bg-gradient-to-r from-pop-pink via-pop-cyan to-pop-purple rounded-sm blur-lg opacity-30 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200 animate-pulse" />

  {/* Main Container */}
  <div className="relative flex bg-space-black border-2 border-pop-pink/30 rounded-sm overflow-hidden backdrop-blur-md">
    
    {/* Animated Scan Line Effect */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />

    {/* Icon Section */}
    <div className="flex items-center justify-center px-4 bg-pop-pink/10 border-r-2 border-pop-pink/20">
      <Globe className="w-5 h-5 text-pop-pink drop-shadow-[0_0_8px_#ff71ce]" />
    </div>

    {/* Input Field */}
    <input 
      type="text" 
      value={url} 
      onChange={(e) => setUrl(e.target.value)}
      placeholder="COORD_INPUT_REQUIRED..."
      className="flex-1 bg-transparent p-4 outline-none font-silkscreen text-[11px] text-pop-cyan placeholder:text-pop-cyan/30 z-20"
    />

    {/* Gamer Button */}
    <button 
      disabled={loading} 
      className="relative group/btn bg-pop-pink text-white px-8 font-silkscreen text-[12px] flex items-center gap-2 hover:bg-white hover:text-pop-pink transition-all duration-300 disabled:opacity-50 cursor-pointer overflow-hidden border-l-2 border-pop-pink/20"
    >
      {/* Button Glitch Hover Effect */}
      <div className="absolute inset-0 bg-pop-cyan translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
      
      <span className="relative z-30 flex items-center gap-2 group-hover/btn:invert">
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <Heart className="w-4 h-4 fill-current" />
        )}
        {loading ? 'WAIT...' : 'GO!'}
      </span>
    </button>
  </div>

  {/* Bottom Status Bar Decorations */}
  <div className="flex justify-between mt-2 px-1">
    <div className="h-1 w-12 bg-pop-cyan shadow-[0_0_8px_#01cdfe]" />
    <div className="h-1 w-32 bg-pop-purple/30" />
    <div className="h-1 w-1 bg-pop-pink animate-ping" />
  </div>
</motion.form>

      {/* Results */}
      <AnimatePresence>
        {data && (
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mt-4 w-full max-w-5xl">
            <div className="mb-12">
               <StellarMap location={data?.location} stats={data?.journey} />
            </div>

            <MissionTrajectory hops={data?.hops} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2 glass-card rounded-3xl p-8 border-t border-white/20">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <h2 className="text-xs font-bold text-pop-pink uppercase tracking-widest flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-pop-pink shadow-[0_0_8px_#ff71ce]" />
                    Live Transmission Stream
                  </h2>
                </div>

                <div className="space-y-4">
                  {data?.hops?.map((hop, index) => (
                    <motion.div 
                      key={hop.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center text-[12px] py-3 border-b border-white/5 hover:bg-white/5 transition-all px-4 rounded-xl"
                    >
                      <span className="text-pop-cyan font-bold w-16">{hop.latency}ms</span>
                      <span className="text-white font-bold w-40 truncate uppercase">{hop.label}</span>
                      <span className="text-white/40 flex-1 truncate italic group-hover:text-pop-purple transition-colors">
                        {hop.description}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <PlanetStats data={data} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}