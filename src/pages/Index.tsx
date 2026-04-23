"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StormBackground from '@/components/grounding/StormBackground';

const Index = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <StormBackground calmLevel={20} />
      
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-5xl mx-auto space-y-16"
      >
        <header className="text-center space-y-6">
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 text-sky-400 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Your personal anchor in the storm</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              THE CALM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">AFTER</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Navigate emotional overwhelm and find your center with scientifically-backed grounding techniques.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/5 backdrop-blur-2xl border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer group h-full overflow-hidden relative" 
              onClick={() => navigate('/session')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-sky-500/20 transition-colors" />
              <CardContent className="p-10 flex flex-col justify-between h-full space-y-8 relative z-10">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform duration-500">
                    <Wind className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight">Guided Session</h3>
                    <p className="text-white/50 text-lg leading-relaxed">A step-by-step journey from the storm to clarity. Perfect for when you feel completely overwhelmed.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/10 h-14 text-lg font-semibold">
                  Start Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card 
              className="bg-white/5 backdrop-blur-2xl border-white/10 text-white hover:bg-white/10 transition-all cursor-pointer group h-full overflow-hidden relative" 
              onClick={() => navigate('/tools')}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-teal-500/20 transition-colors" />
              <CardContent className="p-10 flex flex-col justify-between h-full space-y-8 relative z-10">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform duration-500">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-bold tracking-tight">Quick Tools</h3>
                    <p className="text-white/50 text-lg leading-relaxed">Immediate relief exercises. Breathing, affirmations, and sensory grounding at your fingertips.</p>
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/10 h-14 text-lg font-semibold">
                  Open Toolbox <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.footer variants={itemVariants} className="text-center pt-8">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 text-white/40 text-sm backdrop-blur-sm">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Designed for immediate emotional regulation</span>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Index;