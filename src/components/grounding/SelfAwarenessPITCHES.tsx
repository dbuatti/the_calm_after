"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pitches = [
  { key: 'P', label: 'Pain', desc: 'Do you have any physical pain? What can you do to address it right now?' },
  { key: 'I', label: 'Illness', desc: 'Are you feeling sick or are allergies acting up? How can you care for yourself?' },
  { key: 'T', label: 'Tension', desc: 'Scan from head to toe. Where are you holding tension? Try to stretch or move.' },
  { key: 'C', label: 'Cold/Hot', desc: 'Are you at a comfortable temperature? Adjust your environment if needed.' },
  { key: 'H', label: 'Hunger', desc: 'Is your blood sugar low? Are you "hangry"? Consider a small snack.' },
  { key: 'E', label: 'Emotions', desc: 'What are you feeling right now? If it\'s not what you want, how can you improve the next moment?' },
  { key: 'S', label: 'Safety', desc: 'Are you safe in this context, at this time? Acknowledge your current safety.' },
];

const SelfAwarenessPITCHES = () => {
  const [index, setIndex] = useState(0);
  const item = pitches[index];

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="flex justify-center space-x-2">
        {pitches.map((p, i) => (
          <div 
            key={p.key} 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i === index ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/40'}`}
          >
            {p.key}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center space-y-4 min-h-[120px]"
        >
          <h4 className="text-2xl font-bold text-purple-400">{item.label}</h4>
          <p className="text-white/80 leading-relaxed">{item.desc}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          disabled={index === 0} 
          onClick={() => setIndex(index - 1)}
          className="text-white/40"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          variant="ghost" 
          disabled={index === pitches.length - 1} 
          onClick={() => setIndex(index + 1)}
          className="text-purple-400"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SelfAwarenessPITCHES;