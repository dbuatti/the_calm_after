"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Wind, Shield, ArrowRight, Sparkles, Heart, AlertCircle, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StormBackground from '@/components/grounding/StormBackground';
import MoodMeter from '@/components/grounding/MoodMeter';
import MindfulQuotes from '@/components/grounding/MindfulQuotes';
import AudioToggle from '@/components/grounding/AudioToggle';

const Index = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastUsed, setLastUsed] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('Welcome');

  useEffect(() => {
    const savedFavs = localStorage.getItem('grounding-favorites');
    const savedLast = localStorage.getItem('grounding-last-used');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedLast) setLastUsed(savedLast);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const handleMoodSuggest = (intensity: string) => {
    navigate(`/tools?intensity=${intensity}`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <StormBackground calmLevel={20} />
      <AudioToggle calmLevel={20} />
      <MoodMeter onSuggest={handleMoodSuggest} />
      
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-6xl mx-auto space-y-16 md:space-y-24 py-8 md:py-12"
      >
        <header className="text-center space-y-8 md:space-y-12">
          <div className="space-y-4">
            <MindfulQuotes />
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 text-sky-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              <span>{greeting}</span>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
            <h1 className="text-5xl md:text-[130px] font-black tracking-tighter leading-[0.85] md:leading-[0.75] uppercase text-lume">
              The Calm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-200">After</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed tracking-tight px-4">
              A sanctuary for emotional regulation. Ground yourself in the present moment when the world feels too loud.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
            <Button 
              onClick={() => navigate('/session')} 
              className="bg-white text-slate-950 hover:bg-sky-100 rounded-full px-10 md:px-12 h-14 md:h-16 font-black uppercase tracking-widest text-[10px] md:text-xs shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Start Guided Journey
            </Button>
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Button 
                onClick={() => navigate('/tools')} 
                variant="outline"
                className="relative bg-rose-500/5 border-rose-500/20 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-full px-8 md:px-10 h-14 md:h-16 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all"
              >
                <AlertCircle className="mr-2 h-4 w-4" /> Emergency Grounding
              </Button>
            </div>
          </motion.div>
        </header>

        {(favorites.length > 0 || lastUsed) && (
          <motion.section variants={itemVariants} className="space-y-6 md:space-y-8 px-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Quick Access</h2>
              <Button variant="link" onClick={() => navigate('/tools')} className="text-sky-400/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:text-sky-300">View All</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {lastUsed && (
                <Card 
                  className="bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all cursor-pointer group rounded-[32px]"
                  onClick={() => navigate('/tools')}
                >
                  <CardContent className="p-6 md:p-8 flex items-center space-x-4 md:space-x-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <div className="text-[8px] md:text-[9px] font-bold text-white/20 uppercase tracking-widest">Recent</div>
                      <div className="text-sm md:text-base font-bold text-white">Resume Last</div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {favorites.slice(0, 3).map((favId) => (
                <Card 
                  key={favId}
                  className="bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all cursor-pointer group rounded-[32px]"
                  onClick={() => navigate('/tools')}
                >
                  <CardContent className="p-6 md:p-8 flex items-center space-x-4 md:space-x-5">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                    </div>
                    <div>
                      <div className="text-[8px] md:text-[9px] font-bold text-white/20 uppercase tracking-widest">Favorite</div>
                      <div className="text-sm md:text-base font-bold text-white capitalize">{favId.replace('-', ' ')}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4">
          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/[0.02] backdrop-blur-3xl border-white/10 text-white hover:bg-white/[0.05] transition-all duration-700 cursor-pointer group h-full overflow-hidden relative rounded-[48px] md:rounded-[64px]" 
              onClick={() => navigate('/session')}
            >
              <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-sky-500/5 blur-[100px] md:blur-[120px] -mr-32 -mt-32 md:-mr-40 md:-mt-40 group-hover:bg-sky-500/10 transition-colors duration-700" />
              <CardContent className="p-10 md:p-16 flex flex-col justify-between h-full space-y-12 md:space-y-16 relative z-10">
                <div className="space-y-8 md:space-y-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-sky-500/10 rounded-[28px] md:rounded-[32px] flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                    <Wind className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Guided Session</h3>
                    <p className="text-white/30 text-base md:text-xl leading-relaxed font-light">A meditative journey through the storm. We'll walk you back to clarity, step by step.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/5 h-16 md:h-20 text-xl md:text-2xl font-bold rounded-[28px] md:rounded-[32px] px-8 md:px-10">
                  Begin <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-3 transition-transform duration-500" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/[0.02] backdrop-blur-3xl border-white/10 text-white hover:bg-white/[0.05] transition-all duration-700 cursor-pointer group h-full overflow-hidden relative rounded-[48px] md:rounded-[64px]" 
              onClick={() => navigate('/tools')}
            >
              <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-purple-500/5 blur-[100px] md:blur-[120px] -mr-32 -mt-32 md:-mr-40 md:-mt-40 group-hover:bg-purple-500/10 transition-colors duration-700" />
              <CardContent className="p-10 md:p-16 flex flex-col justify-between h-full space-y-12 md:space-y-16 relative z-10">
                <div className="space-y-8 md:space-y-10">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-purple-500/10 rounded-[28px] md:rounded-[32px] flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700">
                    <Shield className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Quick Tools</h3>
                    <p className="text-white/30 text-base md:text-xl leading-relaxed font-light">Immediate relief for acute stress. Access our full library of grounding exercises instantly.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/5 h-16 md:h-20 text-xl md:text-2xl font-bold rounded-[28px] md:rounded-[32px] px-8 md:px-10">
                  Toolbox <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-3 transition-transform duration-500" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.footer variants={itemVariants} className="text-center pt-8 md:pt-12 pb-8">
          <div className="inline-flex items-center space-x-4 px-8 md:px-10 py-4 md:py-5 bg-white/5 rounded-full border border-white/10 text-white/20 text-xs md:sm font-medium backdrop-blur-sm">
            <Heart className="w-4 h-4 text-rose-500/40" />
            <span>Designed for immediate emotional regulation</span>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Index;