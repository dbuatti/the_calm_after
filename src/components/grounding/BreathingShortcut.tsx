"use client";

import React, { useState, useEffect } from 'react';
import { Wind, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import BalloonBreathing from './BalloonBreathing';

const BreathingShortcut = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b') {
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[60] flex flex-col items-start space-y-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 text-white transition-all duration-500 ${isOpen ? 'scale-0 opacity-0' : 'opacity-100'}`}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Wind className="h-6 w-6 md:h-7 md:w-7" />
          </motion.div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full animate-pulse" />
        </Button>
        <div className={`hidden md:block text-[8px] font-bold text-white/10 uppercase tracking-widest pl-2 transition-opacity duration-500 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          Press 'B' to Breathe
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-3xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-xl bg-white/[0.02] border border-white/10 rounded-[48px] p-8 md:p-12 relative overflow-hidden text-center space-y-8"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white/20 hover:text-white rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Just Breathe</h2>
                <p className="text-white/40 text-sm font-light">Follow the expansion. Let everything else fade away.</p>
              </div>

              <div className="py-4">
                <BalloonBreathing />
              </div>

              <Button
                onClick={() => setIsOpen(false)}
                className="bg-white text-slate-950 hover:bg-sky-100 px-12 h-14 rounded-full font-black uppercase tracking-widest text-xs"
              >
                I'm Ready
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BreathingShortcut;