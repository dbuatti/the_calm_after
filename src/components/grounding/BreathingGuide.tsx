"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQuietMode } from "@/hooks/use-quiet-mode";

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

type Phase = "inhale" | "hold" | "exhale" | "holdEmpty";

interface BreathingGuideProps {
  isActive: boolean;
}

const BreathingGuide: React.FC<BreathingGuideProps> = ({ isActive }) => {
  const [patternIndex, setPatternIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [timer, setTimer] = useState(0);
  const [cycles, setCycles] = useState(0);
  const { quietMode } = useQuietMode();

  const pattern = patterns[patternIndex];
  const phases = useMemo<Phase[]>(
    () => (pattern.holdEmpty ? ["inhale", "hold", "exhale", "holdEmpty"] : ["inhale", "hold", "exhale"]),
    [pattern.holdEmpty],
  );
  const phaseIndex = phases.indexOf(phase);
  const duration =
    phase === "inhale" ? pattern.inhale : phase === "hold" ? pattern.hold : phase === "exhale" ? pattern.exhale : pattern.holdEmpty ?? 1;

  useEffect(() => {
    setPhase("inhale");
    setTimer(0);
    setCycles(0);
  }, [patternIndex]);

  useEffect(() => {
    if (!isActive) {
      setPhase("inhale");
      setTimer(0);
      return;
    }
    const interval = window.setInterval(() => {
      setTimer((previous) => Math.min(previous + 0.1, duration));
    }, 100);
    return () => window.clearInterval(interval);
  }, [isActive, duration]);

  useEffect(() => {
    if (!isActive || timer < duration) return;
    if (!quietMode && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    const nextIndex = (phaseIndex + 1) % phases.length;
    setPhase(phases[nextIndex]);
    setTimer(0);
    if (nextIndex === 0) setCycles((count) => count + 1);
  }, [timer, duration, isActive, phaseIndex, phases, quietMode]);

  const getScale = () => {
    if (phase === "inhale") return 1 + (timer / pattern.inhale) * 0.6;
    if (phase === "hold") return 1.6;
    if (phase === "exhale") return 1.6 - (timer / pattern.exhale) * 0.6;
    return 1;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-8">
      <div className="flex flex-wrap justify-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
        {patterns.map((item, index) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            aria-pressed={patternIndex === index}
            onClick={() => setPatternIndex(index)}
            className={`rounded-full px-4 h-8 text-[10px] font-bold uppercase tracking-widest transition-all ${patternIndex === index ? "bg-white text-slate-950" : "text-white/40 hover:text-white"}`}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className="relative w-72 h-72 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-white/5 rounded-full blur-3xl"
          animate={quietMode ? {} : { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: quietMode ? 0 : Infinity, ease: "easeInOut" }}
          aria-hidden="true"
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
              <span className="text-white font-black text-2xl uppercase tracking-[0.2em]" role="status" aria-live="polite">
                {phase === "holdEmpty" ? "Pause" : phase}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <svg className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
          <circle
            cx="144"
            cy="144"
            r="130"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="816"
            strokeDashoffset={816 - 816 * (timer / duration)}
            className="transition-all duration-100 ease-linear opacity-40"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
          {pattern.inhale}-{pattern.hold}-{pattern.exhale}
          {pattern.holdEmpty ? `-${pattern.holdEmpty}` : ""} Rhythm
        </div>
        <p className="text-sky-400/50 text-[9px] font-black uppercase tracking-widest" role="status" aria-live="polite">
          {isActive ? `${cycles} ${cycles === 1 ? "cycle" : "cycles"} complete` : "Paused"}
        </p>
      </div>
    </div>
  );
};

export default BreathingGuide;
