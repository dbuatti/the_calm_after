import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wind, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StormBackground from '@/components/grounding/StormBackground';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <StormBackground calmLevel={20} />
      
      <main className="z-10 w-full max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              THE CALM <span className="text-sky-400">AFTER</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light mt-4 max-w-2xl mx-auto">
              Navigate the emotional storm and find your center with guided grounding techniques.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer group h-full" onClick={() => navigate('/session')}>
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <Wind className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Guided Session</h3>
                  <p className="text-white/60">A step-by-step journey from the storm to clarity. Perfect for when you feel overwhelmed.</p>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/10">
                  Start Journey <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white/15 transition-all cursor-pointer group h-full" onClick={() => navigate('/tools')}>
              <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Quick Tools</h3>
                  <p className="text-white/60">Immediate relief exercises. Breathing, affirmations, and sensory grounding at your fingertips.</p>
                </div>
                <Button variant="ghost" className="w-full justify-between group-hover:bg-white/10">
                  Open Toolbox <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-white/40 text-sm">
            <Zap className="w-3 h-3" />
            <span>Designed for immediate emotional grounding</span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
