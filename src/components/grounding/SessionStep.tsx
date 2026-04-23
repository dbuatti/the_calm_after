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
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="bg-white/[0.03] backdrop-blur-[40px] border-white/10 text-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden rounded-[40px]">
        <CardContent className="p-10 md:p-20 flex flex-col items-center text-center space-y-12">
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-tight"
            >
              {title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mx-auto font-light"
            >
              {description}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
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