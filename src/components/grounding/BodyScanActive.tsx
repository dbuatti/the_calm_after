"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Dumbbell, Move, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const step = bodySteps[idx];

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <div className="flex justify-center space-x-1">
        {bodySteps.map((_, i) => (
          <div key={i} className={`h-1 w-6 rounded-full transition-colors ${i <= idx ? 'bg-white' : 'bg-white/10'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
          <div className={`w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto ${step.color}`}>
            <step.icon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">{step.title}</h3>
            <p className="text-white/40 leading-relaxed italic">"{step.desc}"</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center space-x-4">
        {idx < bodySteps.length - 1 ? (
          <Button onClick={() => setIdx(idx + 1)} className="bg-white text-slate-950 rounded-full px-12 h-14 font-black uppercase tracking-widest text-xs">
            Next Action <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={() => setIdx(0)} variant="outline" className="rounded-full border-white/10 text-white/40">
            Restart <RotateCcw className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BodyScanActive;