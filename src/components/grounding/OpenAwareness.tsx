"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUp, CheckCircle2, ChevronLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const views = [
  { id: "right", label: "Look to your Right", icon: ArrowRight, desc: "Describe everything you see as completely as possible, as if you were describing it to someone who isn't there." },
  { id: "forward", label: "Look Forward", icon: ArrowUp, desc: "Now look straight ahead. What details do you notice? Colors, textures, light, shadows?" },
  { id: "left", label: "Look to your Left", icon: ArrowLeft, desc: "Finally, look to your left. Describe the scene in full detail." },
];

const OpenAwareness = () => {
  const [index, setIndex] = useState(0);
  const isComplete = index === views.length;
  const view = views[Math.min(index, views.length - 1)];

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30" role="status" aria-live="polite">
        {isComplete ? "All three views complete. You can stop here." : `View ${index + 1} of ${views.length}`}
      </p>

      <div className="flex justify-center">
        {isComplete ? (
          <CheckCircle2 className="w-16 h-16 text-emerald-400" aria-hidden="true" />
        ) : (
          <motion.div
            key={index}
            animate={{ rotate: index === 0 ? 90 : index === 1 ? 0 : -90 }}
            className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400"
          >
            <view.icon className="w-8 h-8" aria-hidden="true" />
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            <h4 className="text-2xl font-bold text-white">{view.label}</h4>
            <p className="text-white/70 leading-relaxed italic">“{view.desc}”</p>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <h4 className="text-2xl font-bold text-white">That's the view</h4>
            <p className="text-white/50 text-sm">Notice one detail you remember. Nothing else to do.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-4">
        {isComplete ? (
          <Button onClick={() => setIndex(0)} variant="outline" className="text-white/40 border-white/10 rounded-full">
            <RotateCcw className="mr-2 w-4 h-4" aria-hidden="true" /> Look again
          </Button>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => setIndex((previous) => Math.max(0, previous - 1))}
              disabled={index === 0}
              className="text-white/40 hover:text-white disabled:opacity-20 rounded-full"
            >
              <ChevronLeft className="mr-2 w-4 h-4" aria-hidden="true" /> Back
            </Button>
            <Button
              onClick={() => setIndex((previous) => Math.min(previous + 1, views.length))}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full"
            >
              {index < views.length - 1 ? "Next view" : "I'm done"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OpenAwareness;
