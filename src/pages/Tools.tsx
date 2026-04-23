"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Droplets, Eye, X, ListChecks, Compass, Activity, ChevronLeft, Search, SlidersHorizontal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import StormBackground from '@/components/grounding/StormBackground';
import BalloonBreathing from '@/components/grounding/BalloonBreathing';
import ColdWaterExercise from '@/components/grounding/ColdWaterExercise';
import NarrationTool from '@/components/grounding/NarrationTool';
import OpenAwareness from '@/components/grounding/OpenAwareness';
import SelfAwarenessPITCHES from '@/components/grounding/SelfAwarenessPITCHES';
import SensoryGrounding from '@/components/grounding/SensoryGrounding';
import AudioToggle from '@/components/grounding/AudioToggle';

const tools = [
  {
    id: 'balloon',
    title: 'Balloon Breathing',
    icon: Wind,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    intensity: 'Low',
    description: 'Focus on the sensory details of air moving through your body.',
    component: <BalloonBreathing />,
  },
  {
    id: 'pitches',
    title: 'PITCHES Check',
    icon: Activity,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    intensity: 'Medium',
    description: 'A comprehensive self-awareness scan for pain, tension, and safety.',
    component: <SelfAwarenessPITCHES />,
  },
  {
    id: 'narration',
    title: 'Narration Tool',
    icon: ListChecks,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    intensity: 'Medium',
    description: 'Engage your logical mind by narrating actions or stating problems.',
    component: <NarrationTool />,
  },
  {
    id: 'open',
    title: 'Open Awareness',
    icon: Compass,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    intensity: 'Low',
    description: 'Describe your environment in detail to anchor yourself in the present.',
    component: <OpenAwareness />,
  },
  {
    id: 'dive',
    title: 'Dive Reflex',
    icon: Droplets,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    intensity: 'High',
    description: 'Use cold water to activate your nervous system\'s "calm" switch.',
    component: <ColdWaterExercise />,
  },
  {
    id: 'sensory',
    title: '5-4-3-2-1 Technique',
    icon: Eye,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    intensity: 'Medium',
    description: 'Engage all your senses to return to the present moment.',
    component: <SensoryGrounding />,
  },
];

const Tools = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<typeof tools[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [intensityFilter, setIntensityFilter] = useState<string | null>(null);
  const [calmLevel, setCalmLevel] = useState(60);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('grounding-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastUsed, setLastUsed] = useState<string | null>(localStorage.getItem('grounding-last-used'));

  useEffect(() => {
    localStorage.setItem('grounding-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleToolClick = (tool: typeof tools[0]) => {
    setActiveTool(tool);
    setLastUsed(tool.id);
    localStorage.setItem('grounding-last-used', tool.id);
  };

  const filteredTools = useMemo(() => {
    return tools
      .filter(tool => {
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesIntensity = intensityFilter ? tool.intensity === intensityFilter : true;
        return matchesSearch && matchesIntensity;
      })
      .sort((a, b) => {
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
      });
  }, [searchQuery, intensityFilter, favorites]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && activeTool) {
        setActiveTool(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTool]);

  return (
    <div className="min-h-screen flex flex-col p-6 md:p-12 relative overflow-hidden">
      <StormBackground calmLevel={calmLevel} />
      <AudioToggle calmLevel={calmLevel} />
      
      <header className="z-10 flex flex-col md:flex-row items-center justify-between mb-12 max-w-6xl mx-auto w-full gap-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white/40 hover:text-white hover:bg-white/10 rounded-full px-6 h-12 font-bold uppercase tracking-widest text-xs"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Home
          </Button>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Toolbox</h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <Input 
              placeholder="Search tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 rounded-full pl-12 h-12 text-white placeholder:text-white/20 focus:ring-sky-500/50"
            />
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
            {['Low', 'Medium', 'High'].map((intensity) => (
              <Button
                key={intensity}
                variant="ghost"
                size="sm"
                onClick={() => setIntensityFilter(intensityFilter === intensity ? null : intensity)}
                className={`rounded-full px-4 h-10 text-[10px] font-bold uppercase tracking-widest transition-all ${intensityFilter === intensity ? 'bg-white text-slate-950' : 'text-white/40 hover:text-white'}`}
              >
                {intensity}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <main className="z-10 flex-1 max-w-6xl mx-auto w-full space-y-12">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">Environment Control</h4>
              <p className="text-xs text-white/40">Adjust the storm intensity to match your mood.</p>
            </div>
          </div>
          <div className="flex-1 max-w-md w-full flex items-center space-x-6">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Stormy</span>
            <Slider 
              value={[calmLevel]} 
              onValueChange={(v) => setCalmLevel(v[0])} 
              max={100} 
              step={1}
              className="cursor-pointer"
            />
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Clear</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card 
                  className={`bg-white/[0.03] backdrop-blur-2xl border-white/10 text-white hover:bg-white/[0.08] transition-all duration-500 cursor-pointer group h-full overflow-hidden rounded-[40px] active:scale-[0.98] relative ${lastUsed === tool.id ? 'ring-2 ring-sky-500/20' : ''}`}
                  onClick={() => handleToolClick(tool)}
                >
                  <CardContent className="p-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`w-16 h-16 ${tool.bg} rounded-[22px] flex items-center justify-center ${tool.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <tool.icon className="w-8 h-8" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {lastUsed === tool.id && (
                          <Badge variant="outline" className="bg-sky-500/10 border-sky-500/20 text-sky-400 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">
                            Recent
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => toggleFavorite(e, tool.id)}
                          className={`w-8 h-8 rounded-full transition-colors ${favorites.includes(tool.id) ? 'text-amber-400 bg-amber-400/10' : 'text-white/20 hover:text-white/40'}`}
                        >
                          <Star className={`w-4 h-4 ${favorites.includes(tool.id) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold tracking-tight">{tool.title}</h3>
                        <Badge variant="outline" className="bg-white/5 border-white/10 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">
                          {tool.intensity}
                        </Badge>
                      </div>
                      <p className="text-white/40 text-sm leading-relaxed font-light">{tool.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredTools.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-24 space-y-4"
          >
            <p className="text-white/20 text-xl font-light italic">No tools match your search...</p>
            <Button variant="link" onClick={() => { setSearchQuery(''); setIntensityFilter(null); }} className="text-sky-400">
              Clear all filters
            </Button>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-white/[0.02] border border-white/10 rounded-[56px] shadow-2xl overflow-hidden relative backdrop-blur-3xl"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTool(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-white hover:bg-white/10 z-10 rounded-full w-12 h-12"
              >
                <X className="h-6 w-6" />
              </Button>

              <div className="p-12 md:p-20 flex flex-col items-center space-y-12">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {activeTool.intensity} Intensity
                    </Badge>
                  </div>
                  <h2 className="text-5xl font-black text-white tracking-tighter uppercase">{activeTool.title}</h2>
                  <p className="text-white/40 text-lg font-light max-w-md mx-auto">{activeTool.description}</p>
                </div>

                <div className="w-full">
                  {activeTool.component}
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <Button
                    onClick={() => setActiveTool(null)}
                    className="bg-white text-slate-950 hover:bg-sky-100 px-20 h-16 rounded-full font-black text-lg shadow-2xl shadow-white/10 uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    I feel better
                  </Button>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Press ESC to Close</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tools;