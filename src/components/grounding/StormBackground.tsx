"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StormBackgroundProps {
  calmLevel: number; // 0 (Stormy) to 100 (Clear)
}

const StormBackground: React.FC<StormBackgroundProps> = ({ calmLevel }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dynamic color mapping based on calmLevel
  const getColors = () => {
    if (calmLevel < 30) return {
      bg: 'bg-[#020617]',
      blob1: 'bg-indigo-900/20',
      blob2: 'bg-blue-900/20',
      blob3: 'bg-slate-900/30'
    };
    if (calmLevel < 70) return {
      bg: 'bg-[#0f172a]',
      blob1: 'bg-sky-900/20',
      blob2: 'bg-indigo-800/20',
      blob3: 'bg-violet-900/20'
    };
    return {
      bg: 'bg-[#bae6fd]',
      blob1: 'bg-amber-200/30',
      blob2: 'bg-rose-200/20',
      blob3: 'bg-sky-100/40'
    };
  };

  const colors = getColors();

  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-[3000ms] ease-in-out ${colors.bg}`}>
      {/* Mesh Blobs */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 50, stiffness: 50 }}
      >
        <motion.div 
          className={`absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] transition-colors duration-[3000ms] ${colors.blob1}`}
          animate={{ 
            x: [0, 50, 0], 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-colors duration-[3000ms] ${colors.blob2}`}
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -60, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className={`absolute top-[20%] right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-[3000ms] ${colors.blob3}`}
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 50, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Rain/Mist Overlay for Stormy states */}
      <AnimatePresence>
        {calmLevel < 60 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: (60 - calmLevel) / 60 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/40" />
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Golden Hour Overlay for Calm states */}
      <AnimatePresence>
        {calmLevel > 70 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: (calmLevel - 70) / 30 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-rose-500/5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StormBackground;