"use client";

import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, CheckCircle2, Clock, RotateCcw, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { hasModifierKey, isDialogOpen, isTypingTarget } from '@/lib/keyboard';
import StormBackground from '@/components/grounding/StormBackground';
import BreathingGuide from '@/components/grounding/BreathingGuide';
import SessionStep from '@/components/grounding/SessionStep';
import ColdWaterExercise from '@/components/grounding/ColdWaterExercise';
import SensoryGrounding from '@/components/grounding/SensoryGrounding';

const steps = [
  {
    id: 'intro',
    title: 'The Storm',
    description: 'Life can feel overwhelming, making you feel disconnected. But there is a way to bring yourself back. Acknowledge the feelings; they are like a storm passing through.',
    calmLevel: 10,
    estimate: '1 min',
  },
  {
    id: 'dive-reflex',
    title: 'Physiology Change',
    description: 'Let\'s activate the Mammalian Dive Reflex. This cools both body and mind, returning you to a calm state. Use a bowl of cold water or ice.',
    calmLevel: 30,
    estimate: '2 mins',
    skippable: true,
    component: () => <ColdWaterExercise />,
  },
  {
    id: 'breath-1',
    title: 'First Breath',
    description: 'As you bring your face back up, take a deep breath in together. Choose a rhythm that feels right for you.',
    calmLevel: 50,
    estimate: '3 mins',
    component: (isActive: boolean) => (
      <BreathingGuide isActive={isActive} />
    ),
  },
  {
    id: 'environment',
    title: 'Connect with Reality',
    description: 'Stand in the room. Feel the ground beneath your feet. Gently guide your awareness back to your reality.',
    calmLevel: 70,
    estimate: '1 min',
  },
  {
    id: 'sensory',
    title: '5-4-3-2-1 Technique',
    description: 'Engage all your senses to return to the present moment. Follow the prompts below.',
    calmLevel: 90,
    estimate: '4 mins',
    component: () => <SensoryGrounding />,
  },
  {
    id: 'calm',
    title: 'The Calm',
    description: 'How does your body feel now? You have the power to center yourself, even when life feels overwhelming. Stay in this space.',
    calmLevel: 100,
    estimate: '1 min',
  },
];

const STEP_KEY = 'grounding-session-step';

function persistStep(value: number | null) {
  try {
    if (value === null) localStorage.removeItem(STEP_KEY);
    else localStorage.setItem(STEP_KEY, String(value));
  } catch {
    // Progress still applies for this visit if storage is unavailable.
  }
}

const Session = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = Number(localStorage.getItem(STEP_KEY));
      return Number.isFinite(saved) && saved >= 0 && saved < steps.length
        ? Math.floor(saved)
        : 0;
    } catch {
      return 0;
    }
  });
  const navigate = useNavigate();
  
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  useEffect(() => {
    persistStep(currentStep);
    // Sync global calm level
    window.dispatchEvent(new CustomEvent('set-calm-level', { detail: step.calmLevel }));
  }, [currentStep, step.calmLevel]);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      persistStep(null);
      navigate('/');
    }
  }, [currentStep, navigate]);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetSession = () => {
    setCurrentStep(0);
    persistStep(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        // If a confirmation or exercise dialog owns Escape, let it close first.
        if (isDialogOpen()) return;
        navigate('/');
        return;
      }
      // Never hijack typing, buttons inside an exercise, or another open dialog.
      if (
        hasModifierKey(e) ||
        isTypingTarget(e.target) ||
        isDialogOpen() ||
        (e.target instanceof HTMLElement && e.target.closest('button, a[href]'))
      ) {
        return;
      }
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        nextStep();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, navigate, nextStep]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <StormBackground calmLevel={step.calmLevel} />

      <div className="fixed top-0 left-0 w-full p-8 z-20 flex items-center justify-between max-w-7xl mx-auto left-1/2 -translate-x-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          aria-label="Save and exit to home"
          title="Save and exit"
          className="text-white/40 hover:text-white hover:bg-white/10 rounded-full w-12 h-12 transition-all"
        >
          <Home className="h-5 w-5" aria-hidden="true" />
        </Button>

        <div className="flex-1 max-w-md mx-12 space-y-2">
          <p className="text-center text-[10px] font-bold uppercase tracking-widest text-white/50" aria-live="polite">
            Step {currentStep + 1} of {steps.length}: {step.title}
          </p>
          <div
            className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={currentStep + 1}
            aria-label="Session progress"
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "circOut" }}
            />
            {steps.map((_, i) => (
              <div 
                key={i} 
                className="absolute top-0 w-1 h-full bg-black/20" 
                style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
            <span>Beginning</span>
            <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Est. {step.estimate}</span>
            <span>Clarity</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center space-x-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/20 hover:text-white/60 rounded-full w-10 h-10"
                  aria-label="Start this session over"
                  title="Start over"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-slate-950 text-white border-white/10 rounded-[40px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Start over?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/50">
                    This returns you to step 1. Your place is saved automatically if you leave instead.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">Keep my place</AlertDialogCancel>
                  <AlertDialogAction onClick={resetSession} className="rounded-full bg-white text-slate-950 hover:bg-sky-100">
                    Start over
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="text-white/40 text-xs font-black tabular-nums">
              {currentStep + 1} / {steps.length}
            </div>
          </div>
          <span className="text-[8px] font-bold uppercase tracking-widest text-white/20">Saved automatically</span>
        </div>
      </div>

      <main className="z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <SessionStep
            key={step.id}
            title={step.title}
            description={step.description}
          >
            {step.component && step.component(true)}
            
            <div className="flex flex-col items-center space-y-6 mt-16">
              <div className="flex items-center justify-center space-x-6">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={prevStep}
                    className="bg-transparent border-white/10 text-white/60 hover:text-white hover:bg-white/5 px-10 h-16 rounded-full font-bold uppercase tracking-widest text-xs transition-all"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                )}
                
                <Button
                  size="lg"
                  onClick={nextStep}
                  className="bg-white text-slate-950 hover:bg-sky-100 px-14 h-16 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  {currentStep === steps.length - 1 ? (
                    <>Finish <CheckCircle2 className="ml-2 h-5 w-5" /></>
                  ) : (
                    <>Continue <ChevronRight className="ml-2 h-5 w-5" /></>
                  )}
                </Button>
              </div>

              {step.skippable && (
                <Button 
                  variant="ghost" 
                  onClick={nextStep}
                  className="text-white/20 hover:text-white/40 text-[10px] font-bold uppercase tracking-widest"
                >
                  <FastForward className="w-4 h-4 mr-2" /> Skip this step
                </Button>
              )}

              <div className="flex items-center space-x-4 text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
                <span>Space / Enter to continue</span>
                <span className="w-1 h-1 bg-white/10 rounded-full" />
                <span>Esc saves &amp; exits</span>
              </div>
            </div>
          </SessionStep>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Session;