"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveUp, MoveDown } from 'lucide-react';

const MindfulMovement = () => {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 0.1;
        if (phase === 'inhale' && next >= 4) { setPhase('exhale'); return 0; }
        if (phase === 'exhale' && next >= 4) { setPhase('inhale'); return 0; }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="flex flex-col items-center space-y-12 py-4">
      <div className="relative w-64 h-80 flex items-center justify-center">
        {/* Visual representation of arms moving */}
        <div className="absolute inset-0 flex justify-between px-8">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 bg-gradient-to-t from-sky-500/20 to-sky-400/60 rounded-full blur-sm"
              animate={{ 
                height: phase === 'inhale' ? ['20%', '100%'] : ['100%', '20%'],
                y: phase === 'inhale' ? [100, 0] : [0, 100]
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div 
          className="z-10 flex flex-col items-center space-y-4"
          animate={{ y: phase === 'inhale' ? -20 : 20 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white">
            {phase === 'inhale' ? <MoveUp className="w-8 h-8" /> : <MoveDown className="w-8 h-8" />}
          </div>
          <span className="text-2xl font-black uppercase tracking-[0.3em] text-white">{phase}</span>
        </motion.div>
      </div>

      <div className="text-center space-y-4 max-w-xs">
        <p className="text-white/60 italic leading-relaxed">
          {phase === 'inhale' 
            ? "Slowly raise your arms above your head as you fill your lungs." 
            : "Gently lower your arms back to your sides as you let the air out."}
        </p>
      </div>
    </div>
  );
};

export default MindfulMovement;