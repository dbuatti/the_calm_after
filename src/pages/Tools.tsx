"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Wind, Droplets, MessageSquare, Eye, X, ListChecks, Compass, Activity, ChevronLeft } from 'lucide-react';
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
      <div className="grid grid-cols-1 gap-3 text-left max-w-md mx-auto">
        {[
          { n: 5, t: "Things you see", s: "or 5 green things" },
          { n: 4, t: "Things you can hear", s: "distant or near" },
          { n: 3, t: "Things you can smell", s: "or favorite scents" },
          { n: 2, t: "Things you can feel", s: "clothing, breeze" },
          { n: 1, t: "Thing you can taste", s: "or imagine a taste" }
        ].map((item) => (
          <div key={item.n} className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <span className="text-rose-400 font-black text-2xl w-8">{item.n}</span>
            <div>
              <div className="text-white font-bold">{item.t}</div>
              <div className="text-white/40 text-sm">{item.s}</div>
            </div>
          </div>
        ))}
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
      
      <header className="z-10 flex items-center justify-between mb-12 max-w-5xl mx-auto w-full">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-white/60 hover:text-white hover:bg-white/10 rounded-full px-4"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> Back Home
        </Button>
        <h1 className="text-3xl font-black text-white tracking-tight">Toolbox</h1>
        <div className="w-24" />
      </header>

      <main className="z-10 flex-1 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="bg-white/5 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer group h-full overflow-hidden"
                onClick={() => setActiveTool(tool)}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  <div className={`w-16 h-16 ${tool.bg} rounded-2xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform duration-500 mb-6`}>
                    <tool.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight">{tool.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{tool.description}</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="w-full max-w-2xl bg-slate-900/50 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative backdrop-blur-3xl"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTool(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white hover:bg-white/10 z-10 rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>

              <div className="p-10 md:p-16 flex flex-col items-center space-y-10">
                <div className="text-center space-y-3">
                  <h2 className="text-4xl font-black text-white tracking-tight">{activeTool.title}</h2>
                  <p className="text-white/40 text-lg">{activeTool.description}</p>
                </div>

                <div className="w-full">
                  {activeTool.component || activeTool.content}
                </div>

                <Button
                  onClick={() => setActiveTool(null)}
                  className="bg-white text-slate-950 hover:bg-sky-100 px-16 h-14 rounded-full font-bold text-lg shadow-xl shadow-white/5"
                >
                  I feel better
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