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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white shadow-2xl overflow-hidden">
        <CardContent className="p-8 md:p-12 flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mx-auto">
              {description}
            </p>
          </div>
          
          <div className="w-full">
            {children}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SessionStep;
