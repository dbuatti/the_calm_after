"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Droplets, Eye, X, ListChecks, Compass, Activity, ChevronLeft, Search, SlidersHorizontal, Star, Zap, Footprints, Clock, Brain, Heart, Accessibility } from 'lucide-react';
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
import EarthingGuide from '@/components/grounding/EarthingGuide';
import AudioToggle from '@/components/grounding/AudioToggle';
import MentalGym from '@/components/grounding/MentalGym';
import SoothingSanctuary from '@/components/grounding/SoothingSanctuary';
import BodyScanActive from '@/components/grounding/BodyScanActive';

const tools = [
  {
    id: 'mental-gym',
    title: 'Mental Gym',
    icon: Brain,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    intensity: 'Medium',
    duration: '3m',
    description: 'Cognitive distractions using categories, math, and reverse spelling.',
    component: <MentalGym />,
  },
  {
    id: 'soothing',
    title: 'Soothing Sanctuary',
    icon: Heart,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    intensity: 'Low',
    duration: '5m',
    description: 'Self-kindness affirmations and visualization of loved ones.',
    component: <SoothingSanctuary />,
  },
  {
    id: 'active-scan',
    title: 'Active Body Scan',
    icon: Accessibility,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    intensity: 'Medium',
    duration: '4m',
    description: 'Physical grounding through stomping, clenching, and stretching.',
    component: <BodyScanActive />,
  },
  {
    id: 'earthing',
    title: 'Physical Earthing',
    icon: Footprints,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    intensity: 'Low',
    duration: '10m',
    description: 'Connect directly with the Earth to reduce inflammation and stress.',
    component: <EarthingGuide />,
  },
  {
    id: 'balloon',
    title: 'Balloon Breathing',
    icon: Wind,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    intensity: 'Low',
    duration: '3m',
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
    duration: '5m',
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
    duration: '2m',
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
    duration: '3m',
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
    duration: '1m',
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
    duration: '5m',
    description: 'Engage all your senses to return to the present moment.',
    component: <SensoryGrounding />,
  },
];

const Tools = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTool, setActiveTool] = useState<typeof tools[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [intensityFilter, setIntensityFilter] = useState<string | null>(searchParams.get('intensity'));
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

  const handleSurpriseMe = () => {
    const targetIntensity = calmLevel < 40 ? 'High' : calmLevel < 70 ? 'Medium' : 'Low';
    const matchingTools = tools.filter(t => t.intensity === targetIntensity);
    const randomTool = matchingTools[Math.floor(Math.random() * matchingTools.length)] || tools[Math.floor(Math.random() * tools.length)];
    handleToolClick(randomTool);
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
    <div className="min-h-screen flex flex-col p-4 md:p-12 relative overflow-hidden">
      <StormBackground calmLevel={calmLevel} />
      <AudioToggle calmLevel={calmLevel} />
      
      <header className="z-10 flex flex-col items-center mb-8 md:mb-12 max-w-6xl mx-auto w-full gap-6 md:gap-8">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white/40 hover:text-white hover:bg-white/10 rounded-full px-4 md:px-6 h-10 md:h-12 font-bold uppercase tracking-widest text-[10px]"
          >
            <ChevronLeft className="mr-1 md:mr-2 h-4 w-4" /> Home
          </Button>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase">Toolbox</h1>
          <div className="w-10 md:w-24" /> {/* Spacer */}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <Input 
              placeholder="Search tools..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 rounded-full pl-12 pr-12 h-12 text-white placeholder:text-white/20 focus:ring-sky-500/50"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 hover:text-white rounded-full"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-full md:w-auto overflow-x-auto no-scrollbar">
            {['Low', 'Medium', 'High'].map((intensity) => (
              <Button
                key={intensity}
                variant="ghost"
                size="sm"
                onClick={() => setIntensityFilter(intensityFilter === intensity ? null : intensity)}
                className={`flex-1 md:flex-none rounded-full px-4 md:px-6 h-10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${intensityFilter === intensity ? 'bg-white text-slate-950' : 'text-white/40 hover:text-white'}`}
              >
                {intensity}
              </Button>
            ))}
          </div>

          <Button 
            onClick={handleSurpriseMe}
            className="w-full md:w-auto bg-sky-500/20 border border-sky-500/30 text-sky-400 hover:bg-sky-500/30 rounded-full px-6 h-12 font-bold uppercase tracking-widest text-[10px]"
          >
            <Zap className="mr-2 h-4 w-4 fill-current" /> Surprise Me
          </Button>
        </div>
      </header>

      <main className="z-10 flex-1 max-w-6xl mx-auto w-full space-y-8 md:space-y-12">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40">
              <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-widest">Environment</h4>
              <p className="text-[9px] md:text-xs text-white/40">Adjust the storm intensity.</p>
            </div>
          </div>
          <div className="flex-1 max-w-md w-full flex items-center space-x-4 md:space-x-6">
            <span className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest">Stormy</span>
            <Slider 
              value={[calmLevel]} 
              onValueChange={(v) => setCalmLevel(v[0])} 
              max={100} 
              step={1}
              className="cursor-pointer"
            />
            <span className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest">Clear</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
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
                  <CardContent className="p-8 md:p-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6 md:mb-8">
                      <div className={`w-14 h-14 md:w-16 md:h-16 ${tool.bg} rounded-[20px] md:rounded-[22px] flex items-center justify-center ${tool.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        <tool.icon className="w-7 h-7 md:w-8 md:h-8" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-white/5 border-white/10 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> {tool.duration}
                        </Badge>
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
                    <div className="space-y-3 md:space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight">{tool.title}</h3>
                        <Badge variant="outline" className="bg-white/5 border-white/10 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">
                          {tool.intensity}
                        </Badge>
                      </div>
                      <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{tool.description}</p>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-white/[0.02] border border-white/10 rounded-[40px] md:rounded-[56px] shadow-2xl overflow-hidden relative backdrop-blur-3xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveTool(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/20 hover:text-white hover:bg-white/10 z-10 rounded-full w-10 h-10 md:w-12 md:h-12"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </Button>

              <div className="p-8 md:p-20 flex flex-col items-center space-y-8 md:space-y-12">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {activeTool.intensity} Intensity
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {activeTool.duration}
                    </Badge>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">{activeTool.title}</h2>
                  <p className="text-white/40 text-base md:text-lg font-light max-w-md mx-auto">{activeTool.description}</p>
                </div>

                <div className="w-full">
                  {activeTool.component}
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <Button
                    onClick={() => setActiveTool(null)}
                    className="bg-white text-slate-950 hover:bg-sky-100 px-12 md:px-20 h-14 md:h-16 rounded-full font-black text-base md:text-lg shadow-2xl shadow-white/10 uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    I feel better
                  </Button>
                  <p className="hidden md:block text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Press ESC to Close</p>
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