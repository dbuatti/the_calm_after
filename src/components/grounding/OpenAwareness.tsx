"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const views = [
  { id: 'right', label: 'Look to your Right', icon: ArrowRight, desc: 'Describe everything you see as completely as possible, as if you were describing it to someone who isn\'t there.' },
  { id: 'forward', label: 'Look Forward', icon: ArrowUp, desc: 'Now look straight ahead. What details do you notice? Colors, textures, light, shadows?' },
  { id: 'left', label: 'Look to your Left', icon: ArrowLeft, desc: 'Finally, look to your left. Describe the scene in full detail.' },
];

const OpenAwareness = () => {
  const [index, setIndex] = useState(0);
  const view = views[index];

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center">
      <div className="flex justify-center">
        <motion.div
          key={index}
          animate={{ rotate: index === 0 ? 90 : index === 1 ? 0 : -90 }}
          className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400"
        >
          <view.icon className="w-8 h-8" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="space-y-4"
        >
          <h4 className="text-2xl font-bold text-white">{view.label}</h4>
          <p className="text-white/70 leading-relaxed italic">"{view.desc}"</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center space-x-4">
        {index < views.length - 1 ? (
          <Button onClick={() => setIndex(index + 1)} className="bg-amber-500 hover:bg-amber-600 text-white">
            Next View
          </Button>
        ) : (
          <Button onClick={() => setIndex(0)} variant="outline" className="text-white/40 border-white/10">
            Restart
          </Button>
        )}
      </div>
    </div>
  );
};

export default OpenAwareness;