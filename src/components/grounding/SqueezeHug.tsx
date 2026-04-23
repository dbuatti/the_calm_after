"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const SqueezeHug = () => {
  const [isSqueezing, setIsSqueezing] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-10 py-4">
      <motion.div
        className="relative w-48 h-48 flex items-center justify-center cursor-pointer"
        onMouseDown={() => setIsSqueezing(true)}
        onMouseUp={() => setIsSqueezing(false)}
        onTouchStart={() => setIsSqueezing(true)}
        onTouchEnd={() => setIsSqueezing(false)}
      >
        <motion.div
          className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl"
          animate={{ scale: isSqueezing ? 1.2 : 1, opacity: isSqueezing ? 0.6 : 0.3 }}
        />
        <motion.div
          className="w-32 h-32 bg-rose-500/10 border-2 border-rose-500/30 rounded-full flex items-center justify-center text-rose-400"
          animate={{ scale: isSqueezing ? 0.9 : 1 }}
        >
          <Heart className={`w-12 h-12 ${isSqueezing ? 'fill-current' : ''}`} />
        </motion.div>
        
        {isSqueezing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-4 flex space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Holding...</span>
          </motion.div>
        )}
      </motion.div>

      <div className="text-center space-y-6 max-w-sm">
        <div className="space-y-2">
          <h4 className="text-white font-bold uppercase tracking-widest text-sm">The Squeeze Hug</h4>
          <p className="text-white/40 text-xs leading-relaxed">
            Cross your arms and place each hand on the opposite shoulder. Give yourself a firm, comfortable squeeze.
          </p>
        </div>
        
        <p className="text-rose-400/60 text-xs italic font-medium">
          "Close your eyes and focus on the sensation of your palms against your shoulders."
        </p>
      </div>
    </div>
  );
};

export default SqueezeHug;