"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Anchor, Thermometer, Music, Volume2, Heart, Package, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const anchors = [
  { title: "Physical Anchor", desc: "Hold a pillow, stuffed animal, or a ball. Notice its weight and texture.", icon: Package, color: "text-sky-400" },
  { title: "Temperature Shift", desc: "Place a cool cloth on your face, or hold something cool like a cold can.", icon: Thermometer, color: "text-blue-400" },
  { title: "Auditory Focus", desc: "Listen to soothing music or focus on a neutral conversation nearby.", icon: Music, color: "text-purple-400" },
  { title: "Special Item", desc: "Keep a small stone in your pocket. Bring your attention to its weight in your hand.", icon: Anchor, color: "text-emerald-400" },
  { title: "Self-Affirmation", desc: "Name one good thing about yourself right now.", icon: Heart, color: "text-rose-400" },
];

const SensoryAnchors = () => {
  const [idx, setIdx] = useState(0);
  const item = anchors[idx];

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <AnimatePresence mode="wait">
        <motion.div 
          key={idx} 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.95 }} 
          className="space-y-6"
        >
          <div className={`w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto ${item.color}`}>
            <item.icon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{item.title}</h3>
            <p className="text-white/60 leading-relaxed italic">"{item.desc}"</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button 
        onClick={() => setIdx((idx + 1) % anchors.length)} 
        variant="outline" 
        className="rounded-full border-white/10 text-white/40"
      >
        Next Anchor <ChevronRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

export default SensoryAnchors;