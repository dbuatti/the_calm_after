"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  "The present moment is the only time over which we have dominion.",
  "Feelings are just visitors, let them come and go.",
  "You are the sky. Everything else is just the weather.",
  "Breathe. You are exactly where you need to be.",
  "Peace is a practice, not a destination.",
  "Your calm is your superpower.",
  "In the middle of a storm, find your anchor.",
];

const MindfulQuotes = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-[0.3em] text-center px-4 italic"
        >
          "{quotes[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default MindfulQuotes;