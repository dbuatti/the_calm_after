"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind, Zap, CloudRain, Sun, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MoodMeterProps {
  onSuggest: (intensity: string) => void;
}

const moods = [
  { id: 'overwhelmed', label: 'Overwhelmed', icon: CloudRain, intensity: 'High', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { id: 'anxious', label: 'Anxious', icon: Zap, intensity: 'High', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'restless', label: 'Restless', icon: Activity, intensity: 'Medium', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'numb', label: 'Numb', icon: Wind, intensity: 'Medium', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { id: 'calm', label: 'Calm', icon: Sun, intensity: 'Low', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const MoodMeter: React.FC<MoodMeterProps> = ({ onSuggest }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('grounding-mood-seen');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (intensity: string) => {
    sessionStorage.setItem('grounding-mood-seen', 'true');
    setIsOpen(false);
    onSuggest(intensity);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-[48px] p-8 md:p-12 relative overflow-hidden shadow-2xl"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/20 hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="text-center space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white tracking-tight uppercase">How are you feeling?</h2>
                <p className="text-white/40 text-sm font-light">Select your current state for a tailored experience.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {moods.map((mood) => (
                  <Button
                    key={mood.id}
                    onClick={() => handleSelect(mood.intensity)}
                    className="h-16 bg-white/5 hover:bg-white/10 border-white/5 flex items-center justify-start px-6 space-x-4 rounded-3xl group transition-all"
                  >
                    <div className={`w-10 h-10 ${mood.bg} ${mood.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <mood.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white font-bold text-lg">{mood.label}</span>
                  </Button>
                ))}
              </div>

              <Button 
                variant="link" 
                onClick={() => setIsOpen(false)}
                className="text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-white"
              >
                Skip for now
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoodMeter;