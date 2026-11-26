"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuietMode } from "@/hooks/use-quiet-mode";

const PHASES = ["inhale", "hold", "exhale"] as const;
const PHASE_SECONDS = 4;
const TARGET_CYCLES = 3;

type Phase = (typeof PHASES)[number];

const BalloonBreathing = () => {
  const [phase, setPhase] = useState<Phase>("inhale");
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { quietMode } = useQuietMode();

  useEffect(() => {
    if (!isActive || isComplete) return;
    const interval = window.setInterval(() => {
      setTimer((previous) => Math.min(previous + 0.1, PHASE_SECONDS));
    }, 100);
    return () => window.clearInterval(interval);
  }, [isActive, isComplete]);

  useEffect(() => {
    if (!isActive || isComplete || timer < PHASE_SECONDS) return;
    setTimer(0);
    const phaseIndex = PHASES.indexOf(phase);
    if (phaseIndex < PHASES.length - 1) {
      setPhase(PHASES[phaseIndex + 1]);
      return;
    }
    const nextCycles = cycles + 1;
    setCycles(nextCycles);
    setPhase("inhale");
    if (nextCycles >= TARGET_CYCLES) setIsComplete(true);
  }, [timer, phase, isActive, isComplete, cycles]);

  const restart = () => {
    setPhase("inhale");
    setTimer(0);
    setCycles(0);
    setIsComplete(false);
    setIsActive(true);
  };

  const status = isComplete
    ? "Three slow breaths complete. That's enough for now."
    : isActive
      ? `${phase} — ${cycles} of ${TARGET_CYCLES} breaths complete.`
      : "Ready when you are. Start the balloon when you want.";

  return (
    <div className="flex flex-col items-center space-y-8 py-4">
      <div className="relative w-64 h-64 flex flex-col items-center justify-center">
        <motion.div
          className="absolute w-32 h-32 bg-sky-400/20 rounded-full blur-xl"
          animate={
            quietMode
              ? { scale: 1, opacity: 0.3 }
              : { scale: phase === "inhale" ? [1, 1.4] : phase === "exhale" ? [1.4, 1] : 1.4, opacity: phase === "inhale" ? [0.2, 0.5] : phase === "exhale" ? [0.5, 0.2] : 0.5 }
          }
          transition={{ duration: PHASE_SECONDS, ease: "linear" }}
          aria-hidden="true"
        />
        <motion.div
          className="w-48 h-48 bg-sky-500/30 rounded-full flex items-center justify-center border-2 border-white/20"
          animate={
            quietMode
              ? { scale: 1 }
              : { scale: phase === "inhale" ? [1, 1.6] : phase === "exhale" ? [1.6, 1] : 1.6 }
          }
          transition={{ duration: PHASE_SECONDS, ease: "linear" }}
        >
          <span className="text-white font-bold text-xl uppercase tracking-widest" role="status" aria-live="polite">
            {isComplete ? "Done" : phase}
          </span>
        </motion.div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <AnimatePresence mode="wait">
          <motion.p
            key={isComplete ? "done" : phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sky-200 font-medium italic"
            role="status"
            aria-live="polite"
          >
            {isComplete
              ? "Notice the pause after the last breath. Nothing more to do."
              : phase === "inhale"
                ? "Notice the cool air in your nose. Feel your belly expand first, then your chest."
                : phase === "hold"
                  ? "Pause. Feel the fullness in your core."
                  : "Notice the warm air leaving your mouth. Feel your chest shrink, then your belly."}
          </motion.p>
        </AnimatePresence>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{status}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {isComplete ? (
            <Button onClick={restart} variant="outline" className="rounded-full border-white/10 text-white/50">
              <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Three more breaths
            </Button>
          ) : (
            <Button onClick={() => setIsActive(!isActive)} className="rounded-full bg-white text-slate-950 hover:bg-sky-100">
              {isActive ? <Pause className="w-4 h-4 mr-2" aria-hidden="true" /> : <Play className="w-4 h-4 mr-2" aria-hidden="true" />}
              {isActive ? "Pause" : cycles > 0 ? "Continue" : "Begin"}
            </Button>
          )}
        </div>
        {isComplete && <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" aria-hidden="true" />}
      </div>
    </div>
  );
};

export default BalloonBreathing;
