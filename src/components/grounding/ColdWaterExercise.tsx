"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Timer, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ColdWaterExercise = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(30);
    setIsActive(true);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-sky-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: isActive ? [1, 1.3, 1] : 1,
            opacity: isActive ? [0.3, 0.6, 0.3] : 0.3
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          {isFinished ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <CheckCircle2 className="w-24 h-24 text-sky-400" />
            </motion.div>
          ) : (
            <>
              <span className="text-6xl font-black text-white tabular-nums tracking-tighter">{timeLeft}</span>
              <span className="text-sky-400/60 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Seconds</span>
            </>
          )}
        </div>

        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="112"
            cy="112"
            r="108"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="678"
            strokeDashoffset={678 - (678 * (timeLeft / 30))}
            className="transition-all duration-1000 ease-linear opacity-20"
          />
          <circle
            cx="112"
            cy="112"
            r="108"
            fill="none"
            stroke="white"
            strokeWidth="1"
            className="opacity-5"
          />
        </svg>
      </div>

      <div className="text-center space-y-6 max-w-md">
        <p className="text-white/50 text-lg leading-relaxed font-light italic">
          {isActive 
            ? "Keep your face in the cold water. Notice the icy sensation against your eyes and cheeks."
            : isFinished 
              ? "Take a deep breath in, let it out slowly. Notice how your body softens."
              : "Prepare your bowl of cold water. When ready, put your face in and start the timer."}
        </p>
        
        {!isActive && (
          <Button 
            onClick={startTimer}
            className="bg-sky-500 hover:bg-sky-600 text-white font-black px-12 h-14 rounded-full uppercase tracking-widest text-xs shadow-xl shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
          >
            {isFinished ? "Restart Timer" : "Start 30s Timer"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ColdWaterExercise;