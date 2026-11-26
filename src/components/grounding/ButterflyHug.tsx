"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Heart, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuietMode } from "@/hooks/use-quiet-mode";

const TARGET_TAPS = 20;

const ButterflyHug = () => {
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const [taps, setTaps] = useState(0);
  const { quietMode } = useQuietMode();
  const isComplete = taps >= TARGET_TAPS;

  const handleTap = (nextSide: "left" | "right") => {
    if (isComplete) return;
    setSide(nextSide);
    setTaps((previous) => previous + 1);
    if (!quietMode && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(40);
    }
  };

  const restart = () => {
    setTaps(0);
    setSide(null);
  };

  const status = isComplete
    ? "Twenty taps — that's the round complete. Notice how you feel."
    : taps === 0
      ? "Tap a side to begin. There is no rush."
      : `${taps} of ${TARGET_TAPS} taps. Keep going slowly.`;

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <div className="relative w-64 h-48 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 bg-rose-500/5 rounded-[40px] blur-2xl"
          animate={quietMode ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: quietMode ? 0 : Infinity }}
          aria-hidden="true"
        />

        <div className="flex space-x-4 relative z-10">
          <motion.button
            type="button"
            aria-label="Tap left side"
            aria-pressed={side === "left"}
            disabled={isComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            onClick={() => handleTap("left")}
            className={`w-24 h-32 rounded-[32px] border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 disabled:opacity-40 ${side === "left" ? "bg-rose-500/20 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]" : "bg-white/5 border-white/10"}`}
          >
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center" aria-hidden="true">
              <div className="w-2 h-2 bg-rose-400 rounded-full" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Left</span>
          </motion.button>

          <motion.button
            type="button"
            aria-label="Tap right side"
            aria-pressed={side === "right"}
            disabled={isComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9, rotate: 5 }}
            onClick={() => handleTap("right")}
            className={`w-24 h-32 rounded-[32px] border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 disabled:opacity-40 ${side === "right" ? "bg-rose-500/20 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]" : "bg-white/5 border-white/10"}`}
          >
            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center" aria-hidden="true">
              <div className="w-2 h-2 bg-rose-400 rounded-full" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Right</span>
          </motion.button>
        </div>
      </div>

      <div className="text-center space-y-4 max-w-xs">
        <div className="space-y-1">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">Butterfly Hug</h4>
          <p className="text-white/40 text-xs leading-relaxed">
            Cross your hands over your chest. Alternately tap your shoulders like the wings of a butterfly.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={isComplete ? "done" : "active"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-400/60 text-[10px] font-black uppercase tracking-[0.2em]"
            role="status"
            aria-live="polite"
          >
            {status}
          </motion.p>
        </AnimatePresence>

        {isComplete && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" aria-hidden="true" />
            <Button onClick={restart} variant="outline" className="rounded-full border-white/10 text-white/50">
              <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Another round
            </Button>
          </div>
        )}
        {!isComplete && (
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">
            <Heart className="w-3 h-3 inline mr-1" aria-hidden="true" /> Stop any time you like
          </p>
        )}
      </div>
    </div>
  );
};

export default ButterflyHug;
