"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  "The present moment is the only time over which we have dominion.",
  "Feelings are just visitors. Let them come and go.",
  "You are the sky. Everything else is just the weather.",
  "Breathe. You are exactly where you need to be.",
  "Peace is a practice, not a destination.",
  "You only have to do this step.",
  "It is okay to go slowly.",
  "You can start again as many times as you need.",
  "Notice one thing you can see right now.",
  "Rest counts as progress.",
];

const MindfulQuotes = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-12 flex flex-col items-center justify-center gap-1.5 overflow-hidden" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.25em] text-center px-4 italic max-w-2xl"
        >
          "{quotes[index]}"
        </motion.p>
      </AnimatePresence>
      <Button
        variant="link"
        onClick={() => setIndex((prev) => (prev + 1) % quotes.length)}
        className="h-auto p-0 text-white/20 hover:text-sky-300 text-[8px] md:text-[9px] font-bold uppercase tracking-widest"
      >
        <RefreshCw className="mr-1.5 h-3 w-3" aria-hidden="true" /> Another thought
      </Button>
    </div>
  );
};

export default MindfulQuotes;
