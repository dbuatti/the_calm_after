"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footprints, Activity, Zap, Moon, Heart, Timer, Info, Droplets, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const benefits = [
  { icon: Droplets, title: "Blood Viscosity", desc: "Reduces blood thickness, allowing red blood cells to flow freely and improving overall circulation." },
  { icon: Zap, title: "Electron Exchange", desc: "The Earth's negative charge provides electrons that act as natural antioxidants to neutralize free radicals." },
  { icon: Activity, title: "Cortisol Regulation", desc: "Helps normalize stress hormone levels, reducing systemic inflammation and improving sleep quality." },
  { icon: ShieldCheck, title: "Wound Healing", desc: "Research indicates that 1 hour of daily grounding can significantly accelerate the healing of chronic wounds." },
];

const EarthingGuide = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [isActive, setIsActive] = useState(false);
  const [showScience, setShowScience] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {!showScience ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white/5 rounded-[32px] p-8 text-center space-y-6 border border-white/10">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                <Footprints className="w-10 h-10" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Physical Earthing</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Find a patch of grass, soil, or sand. Take off your shoes and let your bare feet touch the earth to begin the electron exchange.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-4xl font-black text-white tabular-nums">
                {formatTime(timeLeft)}
              </div>
              <Progress value={(timeLeft / 600) * 100} className="h-1 bg-white/5" />
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={() => setIsActive(!isActive)}
                  className={`${isActive ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500 text-white'} rounded-full px-8`}
                >
                  {isActive ? 'Pause' : 'Start 10m Session'}
                </Button>
              </div>
            </div>
          </div>

          <Button 
            variant="ghost" 
            onClick={() => setShowScience(true)}
            className="w-full text-sky-400/60 hover:text-sky-400 text-[10px] font-bold uppercase tracking-widest"
          >
            <Info className="w-4 h-4 mr-2" /> The Science of Earthing
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-sky-400 shrink-0">
                  <b.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{b.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowScience(false)}
            className="w-full border-white/10 text-white/40 rounded-full"
          >
            Back to Timer
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EarthingGuide;