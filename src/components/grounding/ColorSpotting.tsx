"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const colors = [
  { name: 'Blue', class: 'bg-blue-500', text: 'text-blue-400' },
  { name: 'Green', class: 'bg-emerald-500', text: 'text-emerald-400' },
  { name: 'Red', class: 'bg-rose-500', text: 'text-rose-400' },
  { name: 'Yellow', class: 'bg-amber-400', text: 'text-amber-400' },
  { name: 'Purple', class: 'bg-purple-500', text: 'text-purple-400' },
];

const ColorSpotting = () => {
  const [index, setIndex] = useState(0);
  const [found, setFound] = useState(0);
  const color = colors[index];

  const handleFound = () => {
    if (found < 2) {
      setFound(prev => prev + 1);
    } else {
      setFound(0);
      setIndex((prev) => (prev + 1) % colors.length);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <motion.div
          key={index}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`absolute inset-0 ${color.class} opacity-10 rounded-[48px] blur-3xl`}
        />
        
        <motion.div
          key={color.name}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`w-32 h-32 ${color.class} rounded-[40px] shadow-2xl flex items-center justify-center border-4 border-white/20`}
        >
          <Eye className="w-12 h-12 text-white" />
        </motion.div>
      </div>

      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Find {color.name}</h3>
          <p className="text-white/40 text-xs italic">"Look around your room. Find 3 things that are {color.name.toLowerCase()}."</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full transition-colors duration-500 ${i < found ? color.class : 'bg-white/10'}`}
                animate={i === found ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            ))}
          </div>
          
          <Button 
            onClick={handleFound}
            className={`h-14 px-10 rounded-full font-black uppercase tracking-widest text-xs transition-all ${color.class} text-white hover:brightness-110`}
          >
            I found one
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ColorSpotting;