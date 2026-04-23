"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Hash, Type, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ["Animals", "Countries", "Colors", "Fruits", "Sports Teams", "Movies"];

const MentalGym = () => {
  const [mode, setMode] = useState<'choice' | 'categories' | 'math' | 'spelling'>('choice');
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [mathStep, setMathStep] = useState(100);

  const nextCategory = () => {
    const idx = categories.indexOf(currentCategory);
    setCurrentCategory(categories[(idx + 1) % categories.length]);
  };

  if (mode === 'choice') {
    return (
      <div className="grid grid-cols-1 gap-4 w-full max-w-md mx-auto">
        <Button onClick={() => setMode('categories')} className="h-20 bg-white/5 border-white/10 flex items-center justify-start px-6 space-x-4 rounded-3xl">
          <Type className="w-6 h-6 text-sky-400" />
          <div className="text-left">
            <div className="font-bold">Categories</div>
            <div className="text-xs text-white/40">Name as many items as you can.</div>
          </div>
        </Button>
        <Button onClick={() => setMode('math')} className="h-20 bg-white/5 border-white/10 flex items-center justify-start px-6 space-x-4 rounded-3xl">
          <Hash className="w-6 h-6 text-purple-400" />
          <div className="text-left">
            <div className="font-bold">Math Challenge</div>
            <div className="text-xs text-white/40">Count backward from 100 by 7.</div>
          </div>
        </Button>
        <Button onClick={() => setMode('spelling')} className="h-20 bg-white/5 border-white/10 flex items-center justify-start px-6 space-x-4 rounded-3xl">
          <Brain className="w-6 h-6 text-amber-400" />
          <div className="text-left">
            <div className="font-bold">Reverse Spelling</div>
            <div className="text-xs text-white/40">Spell complex words backwards.</div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-center py-4">
      <AnimatePresence mode="wait">
        {mode === 'categories' && (
          <motion.div key="cat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="text-xs font-black text-sky-400 uppercase tracking-[0.3em]">Category</div>
            <h3 className="text-4xl font-black text-white uppercase">{currentCategory}</h3>
            <p className="text-white/40 italic">"Name every {currentCategory.toLowerCase()} you can think of out loud."</p>
            <Button variant="outline" onClick={nextCategory} className="rounded-full border-white/10 text-white/60">Next Category</Button>
          </motion.div>
        )}

        {mode === 'math' && (
          <motion.div key="math" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="text-xs font-black text-purple-400 uppercase tracking-[0.3em]">Current Number</div>
            <h3 className="text-6xl font-black text-white tabular-nums">{mathStep}</h3>
            <p className="text-white/40 italic">"Subtract 7 from the number above."</p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => setMathStep(prev => Math.max(0, prev - 7))} className="bg-purple-500 text-white rounded-full px-8">- 7</Button>
              <Button variant="ghost" onClick={() => setMathStep(100)} className="text-white/20"><RotateCcw className="w-4 h-4" /></Button>
            </div>
          </motion.div>
        )}

        {mode === 'spelling' && (
          <motion.div key="spell" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="text-xs font-black text-amber-400 uppercase tracking-[0.3em]">Spell Backwards</div>
            <h3 className="text-3xl font-black text-white uppercase tracking-widest">GROUNDING</h3>
            <p className="text-white/40 italic">"Visualize each letter. G... N... I... D... N... U... O... R... G"</p>
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
              {["CALM", "SANCTUARY", "PRESENT", "STRENGTH"].map(word => (
                <div key={word} className="p-3 bg-white/5 rounded-xl text-[10px] font-bold text-white/60">{word}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button variant="ghost" onClick={() => setMode('choice')} className="text-white/20 hover:text-white">Back to Menu</Button>
    </div>
  );
};

export default MentalGym;