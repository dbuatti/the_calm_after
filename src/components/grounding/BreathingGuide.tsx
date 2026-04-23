"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface BreathingPattern {
  name: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdEmpty?: number;
}

const patterns: BreathingPattern[] = [
  { name: "Balanced", inhale: 4, hold: 4, exhale: 4 },
  { name: "Box", inhale: 4, hold: 4, exhale: 4, holdEmpty: 4 },
  { name: "Relax", inhale: 4, hold: 7, exhale: 8 },
];

interface BreathingGuideProps {
  isActive: boolean;
}

const BreathingGuide: React.FC<BreathingGuideProps> = ({ isActive }) => {
  const [patternIndex, setPatternIndex] = useState(0);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEmpty'>('inhale');
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);
  
  const pattern = patterns[patternIndex];

  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      setTimer(0);
      setCycles(0);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 0.1;
        const currentLimit = phase === 'inhale' ? pattern.inhale : 
                           phase === 'hold' ? pattern.hold : 
                           phase === 'exhale' ? pattern.exhale : 
                           (pattern.holdEmpty || 0);

        if (next >= currentLimit) {
          // Haptic feedback on phase change
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50);
          }

          if (phase === 'inhale') setPhase('hold');
          else if (phase === 'hold') setPhase('exhale');
          else if (phase === 'exhale') {
            if (pattern.holdEmpty) setPhase('holdEmpty');
            else {
              setPhase('inhale');
              setCycles(c => c + 1);
            }
          }
          else if (phase === 'holdEmpty') {
            setPhase('inhale');
            setCycles(c => c + 1);
          }
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, phase, pattern]);

  const getScale = () => {
    if (phase === 'inhale') return 1 + (timer / pattern.inhale) * 0.6;
    if (phase === 'hold') return 1.6;
    if (phase === 'exhale') return 1.6 - (timer / pattern.exhale) * 0.6;
    return 1;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8">
      <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
        {patterns.map((p, i) => (
          <Button
            key={p.name}
            variant="ghost"
            size="sm"
            onClick={() => { setPatternIndex(i); setPhase('inhale'); setTimer(0); setCycles(0); }}
            className={`rounded-full px-4 h-8 text-[10px] font-bold uppercase tracking-widest transition-all ${patternIndex === i ? 'bg-white text-slate-950' : 'text-white/40 hover:text-white'}`}
          >
            {p.name}
          </Button>
        ))}
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="w-44 h-44 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/20 z-10"
          animate={{ scale: getScale() }}
          transition={{ duration: 0.1, ease: "linear" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-white font-black text-2xl uppercase tracking-[0.2em]">
                {phase === 'holdEmpty' ? 'Pause' : phase}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="144"
            cy="144"
            r="130"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="816"
            strokeDashoffset={816 - (816 * (timer / (phase === 'inhale' ? pattern.inhale : phase === 'hold' ? pattern.hold : phase === 'exhale' ? pattern.exhale : (pattern.holdEmpty || 1))))}
            className="transition-all duration-100 ease-linear opacity-40"
          />
        </svg>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
          {pattern.inhale}-{pattern.hold}-{pattern.exhale}{pattern.holdEmpty ? `-${pattern.holdEmpty}` : ''} Rhythm
        </div>
        {cycles > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sky-400/40 text-[9px] font-black uppercase tracking-widest"
          >
            Cycle {cycles} Complete
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BreathingGuide;