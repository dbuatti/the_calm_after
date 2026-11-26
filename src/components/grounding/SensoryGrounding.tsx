"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Ear, Eye, Hand, RotateCcw, Utensils, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 5, title: "5 Things You See", icon: Eye, color: "text-rose-400", bg: "bg-rose-500/10", prompt: "Look around you. Find 5 things you can see right now. Describe their colors and shapes in your mind." },
  { id: 4, title: "4 Things You Can Feel", icon: Hand, color: "text-orange-400", bg: "bg-orange-500/10", prompt: "Notice the texture of your clothes, the chair beneath you, or the air on your skin. Find 4 distinct sensations." },
  { id: 3, title: "3 Things You Can Hear", icon: Ear, color: "text-amber-400", bg: "bg-amber-500/10", prompt: "Listen closely. What are 3 sounds you can hear? Maybe a clock ticking, traffic outside, or your own breath." },
  { id: 2, title: "2 Things You Can Smell", icon: Wind, color: "text-emerald-400", bg: "bg-emerald-500/10", prompt: "Try to identify 2 smells in your environment. If you can't smell anything, think of 2 of your favorite scents." },
  { id: 1, title: "1 Thing You Can Taste", icon: Utensils, color: "text-sky-400", bg: "bg-sky-500/10", prompt: "What is 1 thing you can taste? Or imagine the taste of something refreshing, like a piece of mint or cold water." },
];

const SensoryGrounding = () => {
  const [idx, setIdx] = useState(0);
  const isComplete = idx === steps.length;
  const step = steps[Math.min(idx, steps.length - 1)];

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="flex justify-between items-center px-2" aria-hidden="true">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`h-1 flex-1 mx-1 rounded-full transition-all duration-500 ${i < idx || isComplete ? "bg-white" : "bg-white/10"}`}
          />
        ))}
      </div>
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/30" role="status" aria-live="polite">
        {isComplete ? "All five senses complete. That's the exercise." : `Step ${idx + 1} of ${steps.length}`}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={isComplete ? "done" : idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[40px] p-10 text-center space-y-8"
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto" aria-hidden="true" />
              <h3 className="text-3xl font-black text-white tracking-tight uppercase">That's all five</h3>
              <p className="text-white/50 leading-relaxed">You don't have to keep going. Take a breath and notice the room around you.</p>
              <Button onClick={() => setIdx(0)} className="w-full h-16 rounded-3xl bg-white text-slate-950 hover:bg-sky-100 font-bold text-lg">
                <RotateCcw className="mr-2 w-5 h-5" aria-hidden="true" /> Start over
              </Button>
            </>
          ) : (
            <>
              <div className={`w-20 h-20 ${step.bg} ${step.color} rounded-[28px] flex items-center justify-center mx-auto`}>
                <step.icon className="w-10 h-10" aria-hidden="true" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-white tracking-tight uppercase">{step.title}</h3>
                <p className="text-white/50 leading-relaxed italic">“{step.prompt}”</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setIdx((previous) => Math.max(0, previous - 1))}
                  disabled={idx === 0}
                  className="rounded-full text-white/40 hover:text-white disabled:opacity-20"
                >
                  <ChevronLeft className="mr-2 w-5 h-5" aria-hidden="true" /> Back
                </Button>
                <Button
                  onClick={() => setIdx((previous) => Math.min(previous + 1, steps.length))}
                  className="min-w-[180px] h-16 rounded-3xl bg-white text-slate-950 hover:bg-sky-100 font-bold text-lg group"
                >
                  {idx < steps.length - 1 ? "Next step" : "I'm done"}{" "}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SensoryGrounding;
