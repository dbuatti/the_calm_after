"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wind, Zap, CloudRain, Sun, Activity, ChevronRight, ChevronLeft, HeartPulse, Eye, Thermometer, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

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

const spectrums = [
  { id: 'stress', label: 'Stress Level', low: 'Calm', high: 'Overwhelmed', icon: HeartPulse, color: 'from-emerald-500/20 to-rose-500/40' },
  { id: 'sensory', label: 'Sensory Load', low: 'Quiet', high: 'Loud/Bright', icon: Eye, color: 'from-sky-500/20 to-amber-500/40' },
  { id: 'energy', label: 'Energy', low: 'Drained', high: 'Restless', icon: Zap, color: 'from-indigo-500/20 to-purple-500/40' },
  { id: 'comfort', label: 'Physical Comfort', low: 'Pain-free', high: 'Discomfort', icon: Thermometer, color: 'from-teal-500/20 to-orange-500/40' },
  { id: 'clarity', label: 'Mental Clarity', low: 'Clear', high: 'Foggy/Numb', icon: Brain, color: 'from-blue-500/20 to-slate-500/40' },
];

const MoodMeter: React.FC<MoodMeterProps> = ({ onSuggest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'sliders' | 'buttons'>('sliders');
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    stress: 50,
    sensory: 50,
    energy: 50,
    comfort: 50,
    clarity: 50,
  });

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

  const handleSliderContinue = () => {
    const avg = Object.values(sliderValues).reduce((a, b) => a + b, 0) / 5;
    let intensity = 'Medium';
    if (avg < 35) intensity = 'Low';
    else if (avg > 65) intensity = 'High';
    
    handleSelect(intensity);
  };

  const dragTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold && view === 'sliders') {
      setView('buttons');
    } else if (info.offset.x > threshold && view === 'buttons') {
      setView('sliders');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-xl bg-white/[0.02] border border-white/10 rounded-[48px] p-6 md:p-10 relative overflow-hidden shadow-2xl"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white/20 hover:text-white rounded-full z-20"
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="text-center space-y-6 md:space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
                  {view === 'sliders' ? "Check-in with yourself" : "How are you feeling?"}
                </h2>
                <p className="text-white/40 text-xs md:text-sm font-light">
                  {view === 'sliders' 
                    ? "Adjust the spectrums to describe your current state." 
                    : "Select a label that matches your current emotion."}
                </p>
              </div>

              <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  className="w-full cursor-grab active:cursor-grabbing"
                >
                  <AnimatePresence mode="wait">
                    {view === 'sliders' ? (
                      <motion.div
                        key="sliders"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }}
                        transition={dragTransition}
                        className="space-y-6 w-full px-2"
                      >
                        {spectrums.map((s) => (
                          <div key={s.id} className="space-y-3">
                            <div className="flex justify-between items-center px-1">
                              <div className="flex items-center space-x-2 text-white/60">
                                <s.icon className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                              </div>
                              <div className="flex space-x-4 text-[9px] font-medium text-white/30 uppercase tracking-tighter">
                                <span>{s.low}</span>
                                <span className="text-white/10">|</span>
                                <span>{s.high}</span>
                              </div>
                            </div>
                            <div className={`relative h-10 rounded-2xl bg-gradient-to-r ${s.color} p-0.5`}>
                              <Slider
                                value={[sliderValues[s.id]]}
                                onValueChange={(v) => setSliderValues(prev => ({ ...prev, [s.id]: v[0] }))}
                                max={100}
                                step={1}
                                className="h-full px-2"
                              />
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          onClick={handleSliderContinue}
                          className="w-full h-14 rounded-3xl bg-white text-slate-950 hover:bg-sky-100 font-black uppercase tracking-widest text-xs mt-4"
                        >
                          Continue to Tools <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="buttons"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={dragTransition}
                        className="grid grid-cols-1 gap-3 w-full"
                      >
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${view === 'sliders' ? 'bg-white w-4' : 'bg-white/20'}`} />
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${view === 'buttons' ? 'bg-white w-4' : 'bg-white/20'}`} />
                </div>
                
                <div className="flex items-center space-x-2 text-white/20 text-[9px] font-bold uppercase tracking-widest">
                  <ChevronLeft className="w-3 h-3" />
                  <span>Swipe to switch view</span>
                  <ChevronRight className="w-3 h-3" />
                </div>

                <Button 
                  variant="link" 
                  onClick={() => setIsOpen(false)}
                  className="text-white/20 text-[10px] font-bold uppercase tracking-widest hover:text-white"
                >
                  Skip for now
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MoodMeter;