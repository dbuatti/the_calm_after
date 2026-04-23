"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Smile, List, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const affirmations = [
  "You are having a rough time, but you will make it through.",
  "You are strong, and you can move through this pain.",
  "You are trying hard, and you are doing your best.",
  "This moment is tough, but it is only a moment.",
  "You are safe in this space, at this time."
];

const SoothingSanctuary = () => {
  const [step, setStep] = useState<'affirm' | 'favorites' | 'loved'>('affirm');
  const [affIdx, setAffIdx] = useState(0);

  return (
    <div className="w-full max-w-md mx-auto space-y-8 py-4">
      <div className="flex justify-center space-x-4">
        <Button variant="ghost" onClick={() => setStep('affirm')} className={`rounded-full ${step === 'affirm' ? 'bg-rose-500/20 text-rose-400' : 'text-white/20'}`}><Sparkles className="w-4 h-4" /></Button>
        <Button variant="ghost" onClick={() => setStep('favorites')} className={`rounded-full ${step === 'favorites' ? 'bg-sky-500/20 text-sky-400' : 'text-white/20'}`}><List className="w-4 h-4" /></Button>
        <Button variant="ghost" onClick={() => setStep('loved')} className={`rounded-full ${step === 'loved' ? 'bg-amber-500/20 text-amber-400' : 'text-white/20'}`}><Heart className="w-4 h-4" /></Button>
      </div>

      <AnimatePresence mode="wait">
        {step === 'affirm' && (
          <motion.div key="aff" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center space-y-6">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400 mx-auto">
              <Smile className="w-8 h-8" />
            </div>
            <p className="text-2xl font-light text-white leading-relaxed italic">"{affirmations[affIdx]}"</p>
            <Button onClick={() => setAffIdx((affIdx + 1) % affirmations.length)} variant="outline" className="rounded-full border-rose-500/20 text-rose-400">Next Affirmation</Button>
          </motion.div>
        )}

        {step === 'favorites' && (
          <motion.div key="fav" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
            <h3 className="text-xl font-bold text-white text-center">List 3 Favorites</h3>
            <div className="space-y-3">
              {["Favorite Foods", "Favorite Songs", "Favorite Places"].map(cat => (
                <div key={cat} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                  <span className="text-sm font-medium text-white/60">{cat}</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-sky-400/40" />
                    <div className="w-2 h-2 rounded-full bg-sky-400/40" />
                    <div className="w-2 h-2 rounded-full bg-sky-400/40" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'loved' && (
          <motion.div key="love" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center space-y-6">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Visualize a Loved One</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Close your eyes. Picture the face of someone who makes you feel safe. Imagine their voice telling you: <br />
              <span className="text-amber-400/60 italic mt-2 block">"This is tough, but you'll get through it."</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SoothingSanctuary;