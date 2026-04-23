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
    <div className="flex flex-col items-center space-y-8 py-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-sky-500/20 rounded-full blur-2xl"
          animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <div className="relative z-10 flex flex-col items-center">
          {isFinished ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <CheckCircle2 className="w-20 h-20 text-sky-400" />
            </motion.div>
          ) : (
            <>
              <span className="text-5xl font-black text-white tabular-nums">{timeLeft}</span>
              <span className="text-sky-300 text-sm font-medium uppercase tracking-widest">Seconds</span>
            </>
          )}
        </div>

        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="90"
            fill="none"
            stroke="white"
            strokeWidth="4"
            strokeDasharray="565"
            strokeDashoffset={565 - (565 * (timeLeft / 30))}
            className="transition-all duration-1000 ease-linear opacity-30"
          />
        </svg>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <p className="text-white/80 leading-relaxed">
          {isActive 
            ? "Keep your face in the cold water. Notice the icy sensation against your eyes and cheeks."
            : isFinished 
              ? "Take a deep breath in, let it out slowly. Notice how your body softens."
              : "Prepare your bowl of cold water. When ready, put your face in and start the timer."}
        </p>
        
        {!isActive && (
          <Button 
            onClick={startTimer}
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 rounded-full"
          >
            {isFinished ? "Restart Timer" : "Start 30s Timer"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ColdWaterExercise;