"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Wind, Shield, Zap, ArrowRight, Sparkles, Heart, AlertCircle, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StormBackground from '@/components/grounding/StormBackground';

const Index = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastUsed, setLastUsed] = useState<string | null>(null);

  useEffect(() => {
    const savedFavs = localStorage.getItem('grounding-favorites');
    const savedLast = localStorage.getItem('grounding-last-used');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedLast) setLastUsed(savedLast);
  }, []);

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <StormBackground calmLevel={20} />
      
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-6xl mx-auto space-y-24 py-12"
      >
        <header className="text-center space-y-12">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-6 py-2.5 bg-white/5 rounded-full border border-white/10 text-sky-300 text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find your center</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-8">
            <h1 className="text-7xl md:text-[130px] font-black tracking-tighter leading-[0.75] uppercase text-lume">
              The Calm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-200">After</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed tracking-tight">
              A sanctuary for emotional regulation. Ground yourself in the present moment when the world feels too loud.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6">
            <Button 
              onClick={() => navigate('/session')} 
              className="bg-white text-slate-950 hover:bg-sky-100 rounded-full px-12 h-16 font-black uppercase tracking-widest text-xs shadow-2xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
            >
              Start Guided Journey
            </Button>
            <Button 
              onClick={() => navigate('/tools')} 
              variant="outline"
              className="bg-rose-500/5 border-rose-500/20 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-full px-10 h-16 font-bold uppercase tracking-widest text-xs transition-all"
            >
              <AlertCircle className="mr-2 h-4 w-4" /> Emergency Grounding
            </Button>
          </motion.div>
        </header>

        {(favorites.length > 0 || lastUsed) && (
          <motion.section variants={itemVariants} className="space-y-8">
            <div className="flex items-center justify-between px-6">
              <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Quick Access</h2>
              <Button variant="link" onClick={() => navigate('/tools')} className="text-sky-400/60 text-[10px] font-bold uppercase tracking-widest hover:text-sky-300">View All Tools</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {lastUsed && (
                <Card 
                  className="bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all cursor-pointer group rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  onClick={() => navigate('/tools')}
                >
                  <CardContent className="p-8 flex items-center space-x-5">
                    <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Recent</div>
                      <div className="text-base font-bold text-white">Resume Last</div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {favorites.slice(0, 3).map((favId) => (
                <Card 
                  key={favId}
                  className="bg-white/[0.02] border-white/10 hover:bg-white/5 transition-all cursor-pointer group rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                  onClick={() => navigate('/tools')}
                >
                  <CardContent className="p-8 flex items-center space-x-5">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Star className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Favorite</div>
                      <div className="text-base font-bold text-white capitalize">{favId.replace('-', ' ')}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/[0.02] backdrop-blur-3xl border-white/10 text-white hover:bg-white/[0.05] transition-all duration-700 cursor-pointer group h-full overflow-hidden relative rounded-[64px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
              onClick={() => navigate('/session')}
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 blur-[120px] -mr-40 -mt-40 group-hover:bg-sky-500/10 transition-colors duration-700" />
              <CardContent className="p-16 flex flex-col justify-between h-full space-y-16 relative z-10">
                <div className="space-y-10">
                  <div className="w-24 h-24 bg-sky-500/10 rounded-[32px] flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <Wind className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-5xl font-bold tracking-tight">Guided Session</h3>
                    <p className="text-white/30 text-xl leading-relaxed font-light">A meditative journey through the storm. We'll walk you back to clarity, step by step.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/5 h-20 text-2xl font-bold rounded-[32px] px-10">
                  Begin Journey <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/[0.02] backdrop-blur-3xl border-white/10 text-white hover:bg-white/[0.05] transition-all duration-700 cursor-pointer group h-full overflow-hidden relative rounded-[64px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
              onClick={() => navigate('/tools')}
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 blur-[120px] -mr-40 -mt-40 group-hover:bg-purple-500/10 transition-colors duration-700" />
              <CardContent className="p-16 flex flex-col justify-between h-full space-y-16 relative z-10">
                <div className="space-y-10">
                  <div className="w-24 h-24 bg-purple-500/10 rounded-[32px] flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <Shield className="w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-5xl font-bold tracking-tight">Quick Tools</h3>
                    <p className="text-white/30 text-xl leading-relaxed font-light">Immediate relief for acute stress. Access our full library of grounding exercises instantly.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/5 h-20 text-2xl font-bold rounded-[32px] px-10">
                  Open Toolbox <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.footer variants={itemVariants} className="text-center pt-12">
          <div className="inline-flex items-center space-x-4 px-10 py-5 bg-white/5 rounded-full border border-white/10 text-white/20 text-sm font-medium backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Heart className="w-4 h-4 text-rose-500/40" />
            <span>Designed for immediate emotional regulation</span>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Index;