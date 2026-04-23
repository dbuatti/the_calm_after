"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface SessionStepProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const SessionStep: React.FC<SessionStepProps> = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="bg-white/[0.02] backdrop-blur-[60px] border border-white/10 text-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden rounded-[56px] relative">
        {/* Inner Glow */}
        <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[56px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
        
        <CardContent className="p-12 md:p-24 flex flex-col items-center text-center space-y-16 relative z-10">
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-glow"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white/40 leading-relaxed max-w-xl mx-auto font-light"
            >
              {description}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SessionStep;