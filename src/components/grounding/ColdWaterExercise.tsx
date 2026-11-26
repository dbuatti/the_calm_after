"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuietMode } from "@/hooks/use-quiet-mode";

const DURATION = 30;

const ColdWaterExercise = () => {
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { quietMode } = useQuietMode();

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const timeout = window.setTimeout(() => setTimeLeft((previous) => previous - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
    }
  }, [isActive, timeLeft]);

  const startOrResume = () => {
    if (isFinished || timeLeft === 0) {
      setTimeLeft(DURATION);
      setIsFinished(false);
    }
    setHasStarted(true);
    setIsActive(true);
  };

  const reset = () => {
    setIsActive(false);
    setIsFinished(false);
    setHasStarted(false);
    setTimeLeft(DURATION);
  };

  const status = isFinished
    ? "Done. Take a slow breath and notice how your body feels."
    : isActive
      ? "Timer running. You can pause or stop at any time."
      : hasStarted
        ? "Paused. Resume if you want, or stop here."
        : "Ready when you are.";

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <div className="relative w-56 h-56 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-sky-500/10 rounded-full blur-3xl"
          animate={isActive && !quietMode ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 3, repeat: isActive && !quietMode ? Infinity : 0, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {isFinished ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <CheckCircle2 className="w-24 h-24 text-sky-400" aria-hidden="true" />
            </motion.div>
          ) : (
            <>
              <span role="timer" aria-label={`${timeLeft} seconds remaining`} className="text-6xl font-black text-white tabular-nums tracking-tighter">
                {timeLeft}
              </span>
              <span className="text-sky-400/60 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Seconds</span>
            </>
          )}
        </div>

        <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
          <circle
            cx="112"
            cy="112"
            r="108"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="678"
            strokeDashoffset={678 - 678 * (timeLeft / DURATION)}
            className="transition-all duration-1000 ease-linear opacity-20"
          />
          <circle cx="112" cy="112" r="108" fill="none" stroke="white" strokeWidth="1" className="opacity-5" />
        </svg>
      </div>

      <div className="text-center space-y-6 max-w-md">
        <p className="text-white/50 text-lg leading-relaxed font-light italic" aria-live="polite">
          {status}
        </p>
        <p className="text-white/30 text-xs leading-relaxed">
          Prepare a bowl of cold water. Put your face in only when you are ready, and take it out whenever you need to.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={isActive ? () => setIsActive(false) : startOrResume}
            className="bg-sky-500 hover:bg-sky-600 text-white font-black px-10 h-14 rounded-full uppercase tracking-widest text-xs shadow-xl shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
          >
            {isActive ? "Pause / stop" : isFinished ? "Start again" : timeLeft === DURATION ? "Start 30s timer" : "Resume"}
          </Button>
          {(isActive || isFinished || hasStarted) && (
            <Button variant="ghost" onClick={reset} className="rounded-full text-white/40 hover:text-white">
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColdWaterExercise;
