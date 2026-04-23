"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ListChecks, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NarrationTool = () => {
  const [mode, setMode] = useState<'choice' | 'narrate' | 'problem'>('choice');

  if (mode === 'choice') {
    return (
      <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
        <Button 
          onClick={() => setMode('narrate')}
          className="h-20 bg-white/5 hover:bg-white/10 border-white/10 flex items-center justify-start px-6 space-x-4"
        >
          <MessageSquare className="w-6 h-6 text-sky-400" />
          <div className="text-left">
            <div className="font-bold">Narrate Actions</div>
            <div className="text-xs text-white/40">Describe exactly what you are doing now.</div>
          </div>
        </Button>
        <Button 
          onClick={() => setMode('problem')}
          className="h-20 bg-white/5 hover:bg-white/10 border-white/10 flex items-center justify-start px-6 space-x-4"
        >
          <ListChecks className="w-6 h-6 text-teal-400" />
          <div className="text-left">
            <div className="font-bold">State the Problem</div>
            <div className="text-xs text-white/40">Break down a challenge into logical steps.</div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <h3 className="text-xl font-bold text-white">
        {mode === 'narrate' ? "Narrate Your Moment" : "Logical Problem Solving"}
      </h3>
      <p className="text-white/70 italic">
        {mode === 'narrate' 
          ? "Speak out loud: 'I am safe. I am in my room. I am sitting in my chair. I am looking at my screen...'" 
          : "State the problem clearly, then list the steps to solve it as if explaining to a child."}
      </p>
      <Button variant="outline" onClick={() => setMode('choice')} className="text-white/40 border-white/10">
        Switch Mode
      </Button>
    </div>
  );
};

export default NarrationTool;