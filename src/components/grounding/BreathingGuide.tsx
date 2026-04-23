"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathingGuideProps {
  inhaleTime: number;
  holdTime: number;
  exhaleTime: number;
  isActive: boolean;
}

const BreathingGuide: React.FC<BreathingGuideProps> = ({
  inhaleTime,
  holdTime,
  exhaleTime,
  isActive,
}) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase('inhale');
      setTimer(0);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        const next = prev + 0.1;
        
        if (phase === 'inhale' && next >= inhaleTime) {
          setPhase('hold');
          return 0;
        }
        if (phase === 'hold' && next >= holdTime) {
          setPhase('exhale');
          return 0;
        }
        if (phase === 'exhale' && next >= exhaleTime) {
          setPhase('inhale');
          return 0;
        }
        
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, phase, inhaleTime, holdTime, exhaleTime]);

  const getScale = () => {
    if (phase === 'inhale') return 1 + (timer / inhaleTime) * 0.6;
    if (phase === 'hold') return 1.6;
    if (phase === 'exhale') return 1.6 - (timer / exhaleTime) * 0.6;
    return 1;
  };

  const getLabel = () => {
    if (phase === 'inhale') return 'Inhale';
    if (phase === 'hold') return 'Hold';
    if (phase === 'exhale') return 'Exhale';
    return '';
  };

  const getProgress = () => {
    const total = phase === 'inhale' ? inhaleTime : phase === 'hold' ? holdTime : exhaleTime;
    return (timer / total) * 100;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8">
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Outer Glow Layers */}
        <motion.div
          className="absolute inset-0 bg-white/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Breathing Circle */}
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
                {getLabel()}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          <circle
            cx="144"
            cy="144"
            r="130"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="816"
            strokeDashoffset={816 - (816 * getProgress()) / 100}
            className="transition-all duration-100 ease-linear opacity-40"
          />
          <circle
            cx="144"
            cy="144"
            r="130"
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="opacity-10"
          />
        </svg>
      </div>
      
      <div className="flex flex-col items-center space-y-2">
        <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
          Time Remaining
        </div>
        <div className="text-white text-3xl font-light tabular-nums">
          {Math.ceil((phase === 'inhale' ? inhaleTime : phase === 'hold' ? holdTime : exhaleTime) - timer)}s
        </div>
      </div>
    </div>
  );
};

export default BreathingGuide;