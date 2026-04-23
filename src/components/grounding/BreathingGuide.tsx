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
    if (phase === 'inhale') return 1 + (timer / inhaleTime) * 0.5;
    if (phase === 'hold') return 1.5;
    if (phase === 'exhale') return 1.5 - (timer / exhaleTime) * 0.5;
    return 1;
  };

  const getLabel = () => {
    if (phase === 'inhale') return 'Inhale';
    if (phase === 'hold') return 'Hold';
    if (phase === 'exhale') return 'Exhale';
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-4 border-white/20 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Breathing Circle */}
        <motion.div
          className="w-40 h-40 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl"
          animate={{ scale: getScale() }}
          transition={{ duration: 0.1, ease: "linear" }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white font-medium text-xl uppercase tracking-widest"
            >
              {getLabel()}
            </motion.span>
          </AnimatePresence>
        </motion.div>
        
        {/* Progress Ring (SVG) */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="754"
            strokeDashoffset={754 - (754 * (timer / (phase === 'inhale' ? inhaleTime : phase === 'hold' ? holdTime : exhaleTime)))}
            className="transition-all duration-100 ease-linear opacity-50"
          />
        </svg>
      </div>
      
      <div className="text-white/80 text-sm font-light tracking-wide">
        {Math.ceil((phase === 'inhale' ? inhaleTime : phase === 'hold' ? holdTime : exhaleTime) - timer)} seconds remaining
      </div>
    </div>
  );
};

export default BreathingGuide;
