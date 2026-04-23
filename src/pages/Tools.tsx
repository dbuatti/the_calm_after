"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Wind, Droplets, MessageSquare, Eye, X, ListChecks, Compass, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StormBackground from '@/components/grounding/StormBackground';
import BalloonBreathing from '@/components/grounding/BalloonBreathing';
import ColdWaterExercise from '@/components/grounding/ColdWaterExercise';
import NarrationTool from '@/components/grounding/NarrationTool';
import OpenAwareness from '@/components/grounding/OpenAwareness';
import SelfAwarenessPITCHES from '@/components/grounding/SelfAwarenessPITCHES';

const tools = [
  {
    id: 'balloon',
    title: 'Balloon Breathing',
    icon: Wind,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    description: 'Focus on the sensory details of air moving through your body.',
    component: <BalloonBreathing />,
  },
  {
    id: 'pitches',
    title: 'PITCHES Check',
    icon: Activity,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    description: 'A comprehensive self-awareness scan for pain, tension, and safety.',
    component: <SelfAwarenessPITCHES />,
  },
  {
    id: 'narration',
    title: 'Narration Tool',
    icon: ListChecks,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    description: 'Engage your logical mind by narrating actions or stating problems.',
    component: <NarrationTool />,
  },
  {
    id: 'open',
    title: 'Open Awareness',
    icon: Compass,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Describe your environment in detail to anchor yourself in the present.',
    component: <OpenAwareness />,
  },
  {
    id: 'dive',
    title: 'Dive Reflex',
    icon: Droplets,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    description: 'Use cold water to activate your nervous system\'s "calm" switch.',
    component: <ColdWaterExercise />,
  },
  {
    id: 'sensory',
    title: '5-4-3-2-1 Technique',
    icon: Eye,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    description: 'Engage all your senses to return to the present moment.',
    content: (
      <div className="grid grid-cols-1 gap-4 text-left max-w-md mx-auto">
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-rose-400 font-bold text-xl w-6">5</span>
          <span className="text-white/80">Things you see (or 5 green things)</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-rose-400 font-bold text-xl w-6">4</span>
          <span className="text-white/80">Things you can hear</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-rose-400 font-bold text-xl w-6">3</span>
          <span className="text-white/80">Things you can smell</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-rose-400 font-bold text-xl w-6">2</span>
          <span className="text-white/80">Things you can feel (cool breeze, clothing)</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-rose-400 font-bold text-xl w-6">1</span>
          <span className="text-white/80">Thing you can taste</span>
        </div>
      </div>
    ),
  },
];

const Tools = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<typeof tools[0] | null>(null);

  return (
    <div className="min-h-screen flex flex-col p-6 relative overflow-hidden">
      <StormBackground calmLevel={60} />
      
      <header className="z-10 flex items-center justify-between mb-12">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <Home className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-white tracking-tight">Quick Toolbox</h1>
        <div className="w-10" />
      </header>

      <main className="z-10 flex-1 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer group h-full"
                onClick={() => setActiveTool(tool)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-14 h-14 ${tool.bg} rounded-2xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform shrink-0 mb-4`}>
                    <tool.icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{tool.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{tool.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTool(null)}
                className="absolute top-4 right-4 text-white/40 hover:text-white hover:bg-white/10 z-10"
              >
                <X className="h-6 w-6" />
              </Button>

              <div className="p-8 md:p-12 flex flex-col items-center space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-white">{activeTool.title}</h2>
                  <p className="text-white/60">{activeTool.description}</p>
                </div>

                <div className="w-full py-4">
                  {activeTool.component || activeTool.content}
                </div>

                <Button
                  onClick={() => setActiveTool(null)}
                  className="bg-white text-slate-900 hover:bg-sky-100 px-12 font-bold"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tools;