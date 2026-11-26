"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useQuietMode } from "@/hooks/use-quiet-mode";

const SqueezeHug = () => {
  const [isSqueezing, setIsSqueezing] = useState(false);
  const { quietMode } = useQuietMode();

  const release = () => setIsSqueezing(false);

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <motion.button
        type="button"
        aria-label="Press and hold to give yourself a squeeze"
        aria-pressed={isSqueezing}
        onPointerDown={() => setIsSqueezing(true)}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onBlur={release}
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            setIsSqueezing(true);
          }
        }}
        onKeyUp={(event) => {
          if (event.key === " " || event.key === "Enter") release();
        }}
        className="relative w-48 h-48 flex items-center justify-center cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
      >
        <motion.div
          className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl"
          animate={{ scale: isSqueezing ? 1.2 : 1, opacity: isSqueezing ? 0.6 : 0.3 }}
        />
        <motion.div
          className="w-32 h-32 bg-rose-500/10 border-2 border-rose-500/30 rounded-full flex items-center justify-center text-rose-400"
          animate={{ scale: isSqueezing ? 0.9 : 1 }}
        >
          <Heart className={`w-12 h-12 ${isSqueezing ? "fill-current" : ""}`} aria-hidden="true" />
        </motion.div>

        <span className="sr-only" aria-live="polite">
          {isSqueezing ? "Holding" : "Not holding"}
        </span>
        {isSqueezing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-4 flex space-x-2"
          >
            <Sparkles className={`w-4 h-4 text-amber-400 ${quietMode ? "" : "animate-pulse"}`} aria-hidden="true" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Holding…</span>
          </motion.div>
        )}
      </motion.button>

      <div className="text-center space-y-6 max-w-sm">
        <div className="space-y-2">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">The Squeeze Hug</h4>
          <p className="text-white/40 text-xs leading-relaxed">
            Cross your arms and place each hand on the opposite shoulder. Press and hold the circle to match the squeeze with your breath.
          </p>
        </div>

        <p className="text-rose-400/60 text-xs italic font-medium">
          "Notice the steady pressure of your palms against your shoulders."
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
          Release anytime — nothing is being counted
        </p>
      </div>
    </div>
  );
};

export default SqueezeHug;
