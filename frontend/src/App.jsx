import React, { useState } from 'react';
import { Rocket, ShieldAlert, Globe, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      const response = await fetch('http://localhost:5000/test', {
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
      {/* Title Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-black text-space-cyan tracking-tighter italic">
          DATA ODYSSEY
        </h1>
        <p className="text-xs font-mono text-cyan-500/60 mt-2 uppercase tracking-[0.3em]">
          Interstellar Network Probe v4.0
        </p>
      </motion.header>

      {/* Input Module */}
      <motion.form 
        onSubmit={launchProbe}
        className="w-full max-w-xl relative group"
      >
        <div className="absolute -inset-1 bg-space-cyan/20 rounded-lg blur group-focus-within:bg-space-cyan/40 transition"></div>
        
        <div className="relative flex bg-space-900 border border-space-cyan/30 rounded-lg overflow-hidden">
          <div className="flex items-center justify-center px-4 border-r border-space-cyan/20">
            <Globe className="w-5 h-5 text-space-cyan/50" />
          </div>
          
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="ENTER DESTINATION URL (e.g. google.com)"
            className="flex-1 bg-transparent p-4 outline-none font-mono text-sm placeholder:text-slate-600"
          />

          <button 
            disabled={loading}
            className="bg-space-cyan text-space-950 px-6 font-bold flex items-center gap-2 hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Rocket className="w-5 h-5" />}
            {loading ? 'LAUNCHING...' : 'LAUNCH'}
          </button>
        </div>
      </motion.form>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 flex items-center gap-3 text-red-400 font-mono text-sm border border-red-500/30 bg-red-500/5 px-4 py-2 rounded"
          >
            <ShieldAlert className="w-4 h-4" />
            MISSION FAILED: {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Placeholder */}
      {!data && !loading && (
        <p className="mt-12 text-slate-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
          Standing by for coordinates...
        </p>
      )}

      {/* Next Step: This is where we will map the result! */}
      {data && (
        <div className="mt-10 text-space-cyan font-mono text-xs">
          [ DATA RECEIVED FROM {data.hostname} ]
        </div>
      )}
    </div>
  );
} 