"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, User, Sun, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const item = questions[idx];

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <div className="flex justify-center space-x-1">
        {questions.map((_, i) => (
          <div key={i} className={`h-1 w-4 rounded-full transition-colors ${i <= idx ? 'bg-white' : 'bg-white/10'}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={idx} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }} 
          className="space-y-6"
        >
          <div className={`w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto ${item.color}`}>
            <item.icon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">{item.q}</h3>
            <p className="text-white/40 italic">"Answer this question out loud to anchor yourself in time and place."</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center space-x-4">
        {idx < questions.length - 1 ? (
          <Button onClick={() => setIdx(idx + 1)} className="bg-white text-slate-950 rounded-full px-12 h-14 font-black uppercase tracking-widest text-xs">
            Next Question <ChevronRight className="ml-2 w-4 h-4" />
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

export default CognitiveReorientation;