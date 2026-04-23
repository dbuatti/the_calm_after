"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BalloonBreathing = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 0.1;
        if (phase === 'inhale' && next >= 4) { setPhase('hold'); return 0; }
        if (phase === 'hold' && next >= 4) { setPhase('exhale'); return 0; }
        if (phase === 'exhale' && next >= 4) { setPhase('inhale'); return 0; }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="flex flex-col items-center space-y-8 py-4">
      <div className="relative w-64 h-64 flex flex-col items-center justify-center">
        {/* Chest Layer */}
        <motion.div
          className="absolute w-32 h-32 bg-sky-400/20 rounded-full blur-xl"
          animate={{ 
            scale: phase === 'inhale' ? [1, 1.4] : phase === 'exhale' ? [1.4, 1] : 1.4,
            opacity: phase === 'inhale' ? [0.2, 0.5] : phase === 'exhale' ? [0.5, 0.2] : 0.5
          }}
          transition={{ duration: 4, ease: "linear" }}
        />
        {/* Belly Layer */}
        <motion.div
          className="w-48 h-48 bg-sky-500/30 rounded-full flex items-center justify-center border-2 border-white/20"
          animate={{ 
            scale: phase === 'inhale' ? [1, 1.6] : phase === 'exhale' ? [1.6, 1] : 1.6 
          }}
          transition={{ duration: 4, ease: "linear" }}
        >
          <span className="text-white font-bold text-xl uppercase tracking-widest">{phase}</span>
        </motion.div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <AnimatePresence mode="wait">
          <motion.p 
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sky-200 font-medium italic"
          >
            {phase === 'inhale' && "Notice the cool air in your nose. Feel your belly expand first, then your chest."}
            {phase === 'hold' && "Pause. Feel the fullness in your core."}
            {phase === 'exhale' && "Notice the warm air leaving your mouth. Feel your chest shrink, then your belly."}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BalloonBreathing;