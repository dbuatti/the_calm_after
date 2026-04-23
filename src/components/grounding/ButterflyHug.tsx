"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const ButterflyHug = () => {
  const [side, setSide] = useState<'left' | 'right' | null>(null);
  const [taps, setTaps] = useState(0);

  const handleTap = (s: 'left' | 'right') => {
    setSide(s);
    setTaps(prev => prev + 1);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(40);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <div className="relative w-64 h-48 flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 bg-rose-500/5 rounded-[40px] blur-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <div className="flex space-x-4 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            onClick={() => handleTap('left')}
            className={`w-24 h-32 rounded-[32px] border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${side === 'left' ? 'bg-rose-500/20 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-white/5 border-white/10'}`}
          >
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-rose-400 rounded-full" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Left</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: 5 }}
            onClick={() => handleTap('right')}
            className={`w-24 h-32 rounded-[32px] border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${side === 'right' ? 'bg-rose-500/20 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-white/5 border-white/10'}`}
          >
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
              <div className="w-2 h-2 bg-rose-400 rounded-full" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Right</span>
          </motion.button>
        </div>
      </div>

      <div className="text-center space-y-4 max-w-xs">
        <div className="space-y-1">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Butterfly Hug</h4>
          <p className="text-white/40 text-xs leading-relaxed">
            Cross your hands over your chest. Alternately tap your shoulders like the wings of a butterfly.
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.p 
            key={taps > 0 ? 'active' : 'idle'}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-400/60 text-[10px] font-black uppercase tracking-[0.2em]"
          >
            {taps === 0 ? "Tap to begin" : `${taps} Taps • Keep going slowly`}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ButterflyHug;