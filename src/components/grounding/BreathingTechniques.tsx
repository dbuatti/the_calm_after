"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Volume2, Sun, Zap, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const techniques = [
  {
    id: 'lions-breath',
    name: "Lion's Breath",
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    desc: "Great for releasing tension in the face and chest.",
    steps: [
      { action: "Inhale", instruction: "Inhale deeply through your nose.", duration: 4 },
      { action: "Prepare", instruction: "Open your mouth wide and stretch your tongue out toward your chin.", duration: 2 },
      { action: "Exhale", instruction: "Exhale forcefully with a 'Ha' sound, looking up toward your forehead.", duration: 6 },
    ]
  },
  {
    id: 'humming-bee',
    name: "Humming Bee",
    icon: Volume2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    desc: "Creates internal vibration to soothe the nervous system.",
    steps: [
      { action: "Inhale", instruction: "Inhale deeply through your nose.", duration: 4 },
      { action: "Hum", instruction: "Close your ears with your thumbs and hum loudly while exhaling.", duration: 8 },
    ]
  },
  {
    id: 'sitali',
    name: "Cooling Breath",
    icon: Sun,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    desc: "Physically cools the body and calms anger or heat.",
    steps: [
      { action: "Inhale", instruction: "Curl your tongue (or purse lips) and inhale through it like a straw.", duration: 5 },
      { action: "Hold", instruction: "Close your mouth and hold for a moment.", duration: 2 },
      { action: "Exhale", instruction: "Exhale slowly through your nose.", duration: 5 },
    ]
  }
];

const BreathingTechniques = () => {
  const [techIdx, setTechIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const tech = techniques[techIdx];
  const step = tech.steps[stepIdx];

  useEffect(() => {
    let interval: any;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const next = prev + 0.1;
          if (next >= step.duration) {
            setStepIdx((s) => (s + 1) % tech.steps.length);
            return 0;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, step, tech]);

  const reset = () => {
    setIsActive(false);
    setStepIdx(0);
    setTimer(0);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <div className="flex justify-center space-x-2">
        {techniques.map((t, i) => (
          <Button
            key={t.id}
            variant="ghost"
            size="sm"
            onClick={() => { setTechIdx(i); reset(); }}
            className={`rounded-full px-4 h-8 text-[9px] font-bold uppercase tracking-widest transition-all ${techIdx === i ? 'bg-white text-slate-950' : 'text-white/20 hover:text-white'}`}
          >
            {t.name}
          </Button>
        ))}
      </div>

      <div className="relative h-64 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${techIdx}-${stepIdx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-6"
          >
            <div className={`w-24 h-24 ${tech.bg} ${tech.color} rounded-[32px] flex items-center justify-center mx-auto shadow-2xl`}>
              <tech.icon className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                {isActive ? step.action : tech.name}
              </h3>
              <p className="text-white/40 text-sm italic max-w-[280px] mx-auto leading-relaxed">
                {isActive ? step.instruction : tech.desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {isActive && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="754"
              strokeDashoffset={754 - (754 * (timer / step.duration))}
              className="transition-all duration-100 ease-linear opacity-20"
            />
          </svg>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Button
          onClick={() => setIsActive(!isActive)}
          className={`w-full h-16 rounded-3xl font-black uppercase tracking-widest text-xs transition-all ${isActive ? 'bg-white/10 text-white border border-white/10' : 'bg-white text-slate-950 hover:bg-sky-100'}`}
        >
          {isActive ? 'Pause' : 'Start Exercise'}
        </Button>
        {isActive && (
          <Button variant="ghost" onClick={reset} className="text-white/20 hover:text-white">
            <RotateCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default BreathingTechniques;