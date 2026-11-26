"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight, Clock, MapPin, RotateCcw, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  { id: 1, q: "Where am I?", icon: MapPin, color: "text-sky-400" },
  { id: 2, q: "What is today?", icon: Calendar, color: "text-emerald-400" },
  { id: 3, q: "What is the date?", icon: Calendar, color: "text-amber-400" },
  { id: 4, q: "What is the month?", icon: Calendar, color: "text-orange-400" },
  { id: 5, q: "What is the year?", icon: Clock, color: "text-rose-400" },
  { id: 6, q: "How old am I?", icon: User, color: "text-purple-400" },
  { id: 7, q: "What season is it?", icon: Sun, color: "text-teal-400" },
];

const CognitiveReorientation = () => {
  const [idx, setIdx] = useState(0);
  const isComplete = idx === questions.length;
  const item = questions[Math.min(idx, questions.length - 1)];

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <div className="flex justify-center space-x-1" aria-hidden="true">
        {questions.map((_, i) => (
          <div key={i} className={`h-1 w-4 rounded-full transition-colors ${i < idx || isComplete ? "bg-white" : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30" role="status" aria-live="polite">
        {isComplete ? "All seven questions answered. Nicely grounded." : `Question ${idx + 1} of ${questions.length}`}
      </p>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className={`w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto ${item.color}`}>
              <item.icon className="w-10 h-10" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">{item.q}</h3>
              <p className="text-white/40 italic">“Answer this question out loud to anchor yourself in time and place.”</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white">You're here, now</h3>
            <p className="text-white/40 text-sm">No need to repeat it. Notice one thing you can see in this room.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-4">
        {isComplete ? (
          <Button onClick={() => setIdx(0)} variant="outline" className="rounded-full border-white/10 text-white/40">
            <RotateCcw className="mr-2 w-4 h-4" aria-hidden="true" /> Again
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => setIdx((previous) => Math.max(0, previous - 1))}
              disabled={idx === 0}
              className="rounded-full text-white/40 hover:text-white disabled:opacity-20"
            >
              <ChevronLeft className="mr-2 w-4 h-4" aria-hidden="true" /> Back
            </Button>
            <Button
              onClick={() => setIdx((previous) => Math.min(previous + 1, questions.length))}
              className="bg-white text-slate-950 rounded-full px-12 h-14 font-black uppercase tracking-widest text-xs"
            >
              {idx < questions.length - 1 ? "Next question" : "I'm done"}{" "}
              <ChevronRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CognitiveReorientation;
