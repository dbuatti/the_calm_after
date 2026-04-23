import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Wind, Fingerprint, MessageSquare, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StormBackground from '@/components/grounding/StormBackground';
import BreathingGuide from '@/components/grounding/BreathingGuide';

const tools = [
  {
    id: 'breathe',
    title: 'Just Breathe',
    icon: Wind,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    description: 'A simple 4-4-4 breathing cycle to slow your heart rate.',
    component: <BreathingGuide inhaleTime={4} holdTime={4} exhaleTime={4} isActive={true} />,
  },
  {
    id: 'touch',
    title: 'Physical Grounding',
    icon: Fingerprint,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    description: 'Focus on the physical sensations of your body.',
    content: (
      <div className="space-y-6 text-center">
        <p className="text-xl text-white/80">Press your palms together firmly for 5 seconds, then release. Repeat 3 times.</p>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-teal-400/30" />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'affirm',
    title: 'Affirmations',
    icon: MessageSquare,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    description: 'Positive statements to anchor your mind.',
    content: (
      <div className="space-y-4 text-center">
        <p className="text-2xl font-medium text-white italic">"I am safe in this moment."</p>
        <p className="text-2xl font-medium text-white italic">"This feeling is temporary."</p>
        <p className="text-2xl font-medium text-white italic">"I have the strength to navigate this."</p>
      </div>
    ),
  },
  {
    id: 'sensory',
    title: '5-4-3-2-1 Technique',
    icon: Eye,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    description: 'Engage all your senses to return to the present.',
    content: (
      <div className="grid grid-cols-1 gap-4 text-left max-w-md mx-auto">
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-amber-400 font-bold text-xl">5</span>
          <span className="text-white/80">Things you can see</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-amber-400 font-bold text-xl">4</span>
          <span className="text-white/80">Things you can touch</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-amber-400 font-bold text-xl">3</span>
          <span className="text-white/80">Things you can hear</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-amber-400 font-bold text-xl">2</span>
          <span className="text-white/80">Things you can smell</span>
        </div>
        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg">
          <span className="text-amber-400 font-bold text-xl">1</span>
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
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="z-10 flex-1 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer group"
                onClick={() => setActiveTool(tool)}
              >
                <CardContent className="p-6 flex items-start space-x-6">
                  <div className={`w-14 h-14 ${tool.bg} rounded-2xl flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform shrink-0`}>
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

                <div className="w-full py-8">
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
