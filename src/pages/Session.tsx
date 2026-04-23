"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Home, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import StormBackground from '@/components/grounding/StormBackground';
import BreathingGuide from '@/components/grounding/BreathingGuide';
import SessionStep from '@/components/grounding/SessionStep';
import AudioToggle from '@/components/grounding/AudioToggle';
import ColdWaterExercise from '@/components/grounding/ColdWaterExercise';

const steps = [
  {
    id: 'intro',
    title: 'The Storm',
    description: 'Life can feel overwhelming, making you feel disconnected. But there is a way to bring yourself back. Acknowledge the feelings; they are like a storm passing through.',
    calmLevel: 10,
  },
  {
    id: 'dive-reflex',
    title: 'Physiology Change',
    description: 'Let\'s activate the Mammalian Dive Reflex. This cools both body and mind, returning you to a calm state. Use a bowl of cold water or ice.',
    calmLevel: 30,
    component: () => <ColdWaterExercise />,
  },
  {
    id: 'breath-1',
    title: 'First Breath',
    description: 'As you bring your face back up, take a deep breath in together. Inhale deeply, hold, and release slowly.',
    calmLevel: 50,
    component: (isActive: boolean) => (
      <BreathingGuide inhaleTime={4} holdTime={3} exhaleTime={4} isActive={isActive} />
    ),
  },
  {
    id: 'environment',
    title: 'Connect with Reality',
    description: 'Stand in the room. Feel the ground beneath your feet. Gently guide your awareness back to your reality.',
    calmLevel: 70,
  },
  {
    id: 'sensory',
    title: '5-4-3-2-1 Technique',
    description: 'Name 5 things you see, 4 things you can touch (like fabric), 3 things you hear, 2 things you smell, and 1 thing you taste.',
    calmLevel: 90,
  },
  {
    id: 'calm',
    title: 'The Calm',
    description: 'How does your body feel now? You have the power to center yourself, even when life feels overwhelming. Stay in this space.',
    calmLevel: 100,
  },
];

const Session = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <StormBackground calmLevel={step.calmLevel} />
      <AudioToggle calmLevel={step.calmLevel} />

      <div className="fixed top-0 left-0 w-full p-6 z-20 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <Home className="h-6 w-6" />
        </Button>
        
        <div className="flex-1 max-w-md mx-8">
          <Progress value={progress} className="h-1 bg-white/10" />
        </div>
        
        <div className="text-white/40 text-sm font-medium w-12 text-right">
          {currentStep + 1}/{steps.length}
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
            
            <div className="flex items-center justify-center space-x-4 mt-12">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={prevStep}
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 px-8"
                >
                  <ChevronLeft className="mr-2 h-5 w-5" /> Back
                </Button>
              )}
              
              <Button
                size="lg"
                onClick={nextStep}
                className="bg-white text-slate-900 hover:bg-sky-100 px-12 font-bold shadow-lg"
              >
                {currentStep === steps.length - 1 ? (
                  <>Finish <CheckCircle2 className="ml-2 h-5 w-5" /></>
                ) : (
                  <>Continue <ChevronRight className="ml-2 h-5 w-5" /></>
                )}
              </Button>
            </div>
          </SessionStep>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Session;