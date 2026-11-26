"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, CheckCircle2, ChevronLeft, ChevronRight, Dumbbell, Move, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const bodySteps = [
  { title: "Deep Breaths", desc: "Take 5 long, deep breaths through your nose. Exhale through puckered lips.", icon: Move, color: "text-sky-400" },
  { title: "Wiggle Toes", desc: "Place both feet flat on the floor. Curl and uncurl your toes 10 times.", icon: Accessibility, color: "text-emerald-400" },
  { title: "Stomp Feet", desc: "Stomp your feet on the ground. Notice the vibration in your legs.", icon: Move, color: "text-orange-400" },
  { title: "Clench Fists", desc: "Clench your hands into tight fists, then release. Repeat 10 times.", icon: Dumbbell, color: "text-rose-400" },
  { title: "Press Palms", desc: "Press your palms together as hard as you can for 15 seconds.", icon: Move, color: "text-purple-400" },
  { title: "Reach for Sky", desc: "Reach your hands over your head. Stretch as high as you can.", icon: Accessibility, color: "text-amber-400" },
];

const BodyScanActive = () => {
  const [idx, setIdx] = useState(0);
  const isComplete = idx === bodySteps.length;
  const step = bodySteps[Math.min(idx, bodySteps.length - 1)];

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <div className="flex justify-center space-x-1" aria-hidden="true">
        {bodySteps.map((_, i) => (
          <div key={i} className={`h-1 w-6 rounded-full transition-colors ${i < idx || isComplete ? "bg-white" : "bg-white/10"}`} />
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30" role="status" aria-live="polite">
        {isComplete ? "All six actions complete. Well done." : `Action ${idx + 1} of ${bodySteps.length}: ${step.title}`}
      </p>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className={`w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto ${step.color}`}>
              <step.icon className="w-10 h-10" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white uppercase tracking-tight">{step.title}</h3>
              <p className="text-white/40 leading-relaxed italic">“{step.desc}”</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto" aria-hidden="true" />
            <h3 className="text-2xl font-bold text-white">That's the whole sequence</h3>
            <p className="text-white/40 text-sm">You can stop here. Notice if your body feels any different.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-4">
        {isComplete ? (
          <Button onClick={() => setIdx(0)} variant="outline" className="rounded-full border-white/10 text-white/40">
            <RotateCcw className="mr-2 w-4 h-4" aria-hidden="true" /> Do it again
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
              onClick={() => setIdx((previous) => Math.min(previous + 1, bodySteps.length))}
              className="bg-white text-slate-950 rounded-full px-12 h-14 font-black uppercase tracking-widest text-xs"
            >
              {idx < bodySteps.length - 1 ? "Next action" : "I'm done"}{" "}
              <ChevronRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default BodyScanActive;
