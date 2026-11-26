"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Volume2, Sun, Zap, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const techniques = [
  {
    id: "lions-breath",
    name: "Lion's Breath",
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    desc: "Great for releasing tension in the face and chest.",
    steps: [
      { action: "Inhale", instruction: "Inhale deeply through your nose.", duration: 4 },
      { action: "Prepare", instruction: "Open your mouth wide and stretch your tongue out toward your chin.", duration: 2 },
      { action: "Exhale", instruction: "Exhale forcefully with a 'Ha' sound, looking up toward your forehead.", duration: 6 },
    ],
  },
  {
    id: "humming-bee",
    name: "Humming Bee",
    icon: Volume2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    desc: "Creates internal vibration to soothe the nervous system.",
    steps: [
      { action: "Inhale", instruction: "Inhale deeply through your nose.", duration: 4 },
      { action: "Hum", instruction: "Close your ears with your thumbs and hum loudly while exhaling.", duration: 8 },
    ],
  },
  {
    id: "sitali",
    name: "Cooling Breath",
    icon: Sun,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    desc: "Physically cools the body and calms anger or heat.",
    steps: [
      { action: "Inhale", instruction: "Curl your tongue (or purse lips) and inhale through it like a straw.", duration: 5 },
      { action: "Hold", instruction: "Close your mouth and hold for a moment.", duration: 2 },
      { action: "Exhale", instruction: "Exhale slowly through your nose.", duration: 5 },
    ],
  },
];

const BreathingTechniques = () => {
  const [techIdx, setTechIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const tech = techniques[techIdx];
  const step = tech.steps[stepIdx];

  useEffect(() => {
    if (!isActive || isComplete) return;
    const interval = window.setInterval(() => {
      setElapsed((previous) => Math.min(previous + 0.1, step.duration));
    }, 100);
    return () => window.clearInterval(interval);
  }, [isActive, isComplete, step.duration]);

  useEffect(() => {
    if (!isActive || isComplete || elapsed < step.duration) return;
    if (stepIdx < tech.steps.length - 1) {
      setStepIdx(stepIdx + 1);
      setElapsed(0);
    } else {
      setIsActive(false);
      setIsComplete(true);
    }
  }, [elapsed, isActive, isComplete, step.duration, stepIdx, tech.steps.length]);

  const reset = () => {
    setIsActive(false);
    setIsComplete(false);
    setStepIdx(0);
    setElapsed(0);
  };

  const selectTechnique = (index: number) => {
    setTechIdx(index);
    reset();
  };

  const toggle = () => {
    if (isComplete) {
      reset();
      setIsActive(true);
      return;
    }
    setIsActive(!isActive);
  };

  const skipStep = () => {
    if (stepIdx < tech.steps.length - 1) {
      setStepIdx(stepIdx + 1);
      setElapsed(0);
    } else {
      setIsActive(false);
      setIsComplete(true);
    }
  };

  const status = isComplete
    ? `${tech.name} complete. Notice how you feel.`
    : isActive
      ? `Step ${stepIdx + 1} of ${tech.steps.length}: ${step.action} for ${Math.max(0, Math.ceil(step.duration - elapsed))} seconds.`
      : "Ready when you are. You can pause or skip at any time.";

  return (
    <div className="w-full max-w-md mx-auto space-y-8 text-center py-4">
      <div className="flex flex-wrap justify-center gap-2">
        {techniques.map((item, index) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            aria-pressed={techIdx === index}
            onClick={() => selectTechnique(index)}
            className={`rounded-full px-4 h-8 text-[9px] font-bold uppercase tracking-widest transition-all ${techIdx === index ? "bg-white text-slate-950" : "text-white/20 hover:text-white"}`}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className="relative h-64 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${techIdx}-${stepIdx}-${isComplete}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="space-y-6"
          >
            <div className={`w-24 h-24 ${isComplete ? "bg-emerald-500/10 text-emerald-400" : `${tech.bg} ${tech.color}`} rounded-[32px] flex items-center justify-center mx-auto shadow-2xl`}>
              {isComplete ? <CheckCircle2 className="w-10 h-10" aria-hidden="true" /> : <tech.icon className="w-10 h-10" aria-hidden="true" />}
            </div>
            <div className="space-y-2" role="status" aria-live="polite">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                {isComplete ? "Complete" : isActive ? step.action : tech.name}
              </h3>
              <p className="text-white/40 text-sm italic max-w-[280px] mx-auto leading-relaxed">
                {isComplete ? "That's the whole exercise. Nothing else to do." : isActive ? step.instruction : tech.desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {isActive && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" aria-hidden="true">
            <circle
              cx="50%"
              cy="50%"
              r="120"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="754"
              strokeDashoffset={754 - 754 * (elapsed / step.duration)}
              className="transition-all duration-100 ease-linear opacity-20"
            />
          </svg>
        )}
      </div>

      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30" aria-live="polite">
        {status}
      </p>

      <div className="flex flex-col items-center space-y-4">
        <Button
          onClick={toggle}
          className={`w-full h-16 rounded-3xl font-black uppercase tracking-widest text-xs transition-all ${isActive ? "bg-white/10 text-white border border-white/10" : "bg-white text-slate-950 hover:bg-sky-100"}`}
        >
          {isComplete ? "Do another round" : isActive ? "Pause" : "Start exercise"}
        </Button>
        {isActive && (
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="ghost" onClick={skipStep} className="text-white/50 hover:text-white">
              Skip step <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button variant="ghost" onClick={reset} className="text-white/20 hover:text-white">
              <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreathingTechniques;
