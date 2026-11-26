"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const colors = [
  { name: "Blue", class: "bg-blue-500", text: "text-blue-400" },
  { name: "Green", class: "bg-emerald-500", text: "text-emerald-400" },
  { name: "Red", class: "bg-rose-500", text: "text-rose-400" },
  { name: "Yellow", class: "bg-amber-400", text: "text-amber-400" },
  { name: "Purple", class: "bg-purple-500", text: "text-purple-400" },
];

const PER_COLOR = 3;

const ColorSpotting = () => {
  const [progress, setProgress] = useState({ colorIndex: 0, found: 0 });
  const color = colors[progress.colorIndex];
  const isComplete = progress.colorIndex === colors.length - 1 && progress.found === PER_COLOR;

  const handleFound = () => {
    setProgress((previous) => {
      if (previous.colorIndex === colors.length - 1 && previous.found === PER_COLOR) return previous;
      if (previous.found < PER_COLOR - 1) return { ...previous, found: previous.found + 1 };
      if (previous.colorIndex < colors.length - 1) return { colorIndex: previous.colorIndex + 1, found: 0 };
      return { ...previous, found: PER_COLOR };
    });
  };

  const restart = () => setProgress({ colorIndex: 0, found: 0 });

  const status = isComplete
    ? "All five colours found. That's the exercise complete — notice how you feel."
    : `Colour ${progress.colorIndex + 1} of ${colors.length}. Found ${progress.found} of ${PER_COLOR} ${color.name.toLowerCase()} things.`;

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {isComplete ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center space-y-3">
            <CheckCircle2 className="w-24 h-24 text-emerald-400" aria-hidden="true" />
            <span className="text-emerald-400/70 text-[10px] font-black uppercase tracking-[0.25em]">Done</span>
          </motion.div>
        ) : (
          <>
            <motion.div
              key={progress.colorIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`absolute inset-0 ${color.class} opacity-10 rounded-[48px] blur-3xl`}
              aria-hidden="true"
            />
            <motion.div
              key={color.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className={`w-32 h-32 ${color.class} rounded-[40px] shadow-2xl flex items-center justify-center border-4 border-white/20`}
              role="img"
              aria-label={`${color.name} card`}
            >
              <Eye className="w-12 h-12 text-white" aria-hidden="true" />
            </motion.div>
          </>
        )}
      </div>

      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
            {isComplete ? "Well done" : `Find ${color.name}`}
          </h3>
          <p className="text-white/40 text-xs italic">
            {isComplete
              ? "You don't have to keep going. Stop whenever you like."
              : `Look around your room. Find ${PER_COLOR} things that are ${color.name.toLowerCase()}.`}
          </p>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30" role="status" aria-live="polite">
          {status}
        </p>

        <div className="flex flex-col items-center space-y-4">
          {!isComplete && (
            <>
              <div className="flex space-x-2" aria-hidden="true">
                {Array.from({ length: PER_COLOR }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-full ${i < progress.found ? color.class : "bg-white/10"}`}
                    animate={i === progress.found ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={{ repeat: i === progress.found ? Infinity : 0, duration: 2 }}
                  />
                ))}
              </div>
              <Button
                onClick={handleFound}
                className={`h-14 px-10 rounded-full font-black uppercase tracking-widest text-xs transition-all ${color.class} text-white hover:brightness-110`}
              >
                I found one
              </Button>
            </>
          )}
          {isComplete && (
            <Button onClick={restart} variant="outline" className="rounded-full border-white/10 text-white/50">
              <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Start over
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorSpotting;
