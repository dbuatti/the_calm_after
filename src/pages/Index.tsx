"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Wind, Shield, Zap, ArrowRight, Sparkles, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StormBackground from '@/components/grounding/StormBackground';

const Index = () => {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
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
        className="z-10 w-full max-w-6xl mx-auto space-y-24"
      >
        <header className="text-center space-y-8">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 text-sky-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Find your center</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-7xl md:text-[120px] font-black text-white tracking-tighter leading-[0.85] uppercase">
              The Calm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">After</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed tracking-tight">
              A sanctuary for emotional regulation. Ground yourself in the present moment when the world feels too loud.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4">
            <Button 
              onClick={() => navigate('/tools')} 
              variant="outline"
              className="bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-full px-8 h-14 font-bold uppercase tracking-widest text-xs transition-all"
            >
              <AlertCircle className="mr-2 h-4 w-4" /> Emergency Grounding
            </Button>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/[0.03] backdrop-blur-3xl border-white/10 text-white hover:bg-white/[0.06] transition-all duration-700 cursor-pointer group h-full overflow-hidden relative rounded-[48px]" 
              onClick={() => navigate('/session')}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-[100px] -mr-32 -mt-32 group-hover:bg-sky-500/20 transition-colors duration-700" />
              <CardContent className="p-12 flex flex-col justify-between h-full space-y-12 relative z-10">
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-sky-500/20 rounded-[28px] flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                    <Wind className="w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-4xl font-bold tracking-tight">Guided Session</h3>
                    <p className="text-white/40 text-lg leading-relaxed font-light">A meditative journey through the storm. We'll walk you back to clarity, step by step.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/10 h-16 text-xl font-bold rounded-3xl px-8">
                  Begin Journey <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/[0.03] backdrop-blur-3xl border-white/10 text-white hover:bg-white/[0.06] transition-all duration-700 cursor-pointer group h-full overflow-hidden relative rounded-[48px]" 
              onClick={() => navigate('/tools')}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] -mr-32 -mt-32 group-hover:bg-purple-500/20 transition-colors duration-700" />
              <CardContent className="p-12 flex flex-col justify-between h-full space-y-12 relative z-10">
                <div className="space-y-8">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-[28px] flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-4xl font-bold tracking-tight">Quick Tools</h3>
                    <p className="text-white/40 text-lg leading-relaxed font-light">Immediate relief for acute stress. Access our full library of grounding exercises instantly.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/10 h-16 text-xl font-bold rounded-3xl px-8">
                  Open Toolbox <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.footer variants={itemVariants} className="text-center pt-12">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/5 rounded-full border border-white/10 text-white/30 text-sm font-medium backdrop-blur-sm">
            <Heart className="w-4 h-4 text-rose-500/60" />
            <span>Designed for immediate emotional regulation</span>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Index;