"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MoveDown, MoveUp, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuietMode } from "@/hooks/use-quiet-mode";

const PHASE_SECONDS = 4;
const TARGET_CYCLES = 3;

const MindfulMovement = () => {
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
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
    if (phase === "inhale") {
      setPhase("exhale");
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
    ? "Three movements complete. You can stop here."
    : isActive
      ? `${phase} — ${cycles} of ${TARGET_CYCLES} movements complete.`
      : "Ready when you are. Begin when you want.";

  return (
    <div className="flex flex-col items-center space-y-12 py-4">
      <div className="relative w-64 h-80 flex items-center justify-center">
        <div className="absolute inset-0 flex justify-between px-8" aria-hidden="true">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-4 bg-gradient-to-t from-sky-500/20 to-sky-400/60 rounded-full blur-sm"
              animate={
                quietMode
                  ? { height: "60%", y: 50 }
                  : { height: phase === "inhale" ? ["20%", "100%"] : ["100%", "20%"], y: phase === "inhale" ? [100, 0] : [0, 100] }
              }
              transition={{ duration: PHASE_SECONDS, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div
          className="z-10 flex flex-col items-center space-y-4"
          animate={quietMode ? { y: 0 } : { y: phase === "inhale" ? -20 : 20 }}
          transition={{ duration: PHASE_SECONDS, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white">
            {phase === "inhale" ? <MoveUp className="w-8 h-8" aria-hidden="true" /> : <MoveDown className="w-8 h-8" aria-hidden="true" />}
          </div>
          <span className="text-2xl font-black uppercase tracking-[0.3em] text-white" role="status" aria-live="polite">
            {isComplete ? "Done" : phase}
          </span>
        </motion.div>
      </div>

      <div className="text-center space-y-4 max-w-xs">
        <p className="text-white/60 italic leading-relaxed" role="status" aria-live="polite">
          {isComplete
            ? "Notice your arms resting at your sides. Nothing else to do."
            : phase === "inhale"
              ? "Slowly raise your arms above your head as you fill your lungs."
              : "Gently lower your arms back to your sides as you let the air out."}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{status}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {isComplete ? (
            <Button onClick={restart} variant="outline" className="rounded-full border-white/10 text-white/50">
              <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Three more
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

export default MindfulMovement;
