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

  const getBgStyles = () => {
    if (calmLevel < 30) return 'from-slate-950 via-slate-900 to-indigo-950';
    if (calmLevel < 60) return 'from-slate-800 via-slate-700 to-slate-900';
    if (calmLevel < 90) return 'from-sky-600 via-sky-400 to-indigo-400';
    return 'from-sky-300 via-sky-200 to-white';
  };

  return (
    <div className={`fixed inset-0 -z-10 transition-all duration-1000 ease-in-out bg-gradient-to-br ${getBgStyles()}`}>
      {/* Parallax Container */}
      <motion.div 
        className="absolute inset-0"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
      >
        {/* Storm Clouds / Rain Effect */}
        <AnimatePresence>
          {calmLevel < 60 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: (60 - calmLevel) / 60 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              {/* Rain drops */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-px h-24 bg-white/40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-10%`,
                    }}
                    animate={{
                      top: ['-10%', '110%'],
                    }}
                    transition={{
                      duration: 0.4 + Math.random() * 0.4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
              
              {/* Dynamic Clouds */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-slate-900/30 blur-[100px]"
                    style={{
                      width: `${400 + Math.random() * 600}px`,
                      height: `${300 + Math.random() * 400}px`,
                      left: `${Math.random() * 100 - 20}%`,
                      top: `${Math.random() * 100 - 20}%`,
                    }}
                    animate={{
                      x: [0, 100, 0],
                      y: [0, 50, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 15 + Math.random() * 15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sun / Brightness */}
        <AnimatePresence>
          {calmLevel > 40 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: (calmLevel - 40) / 60 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default StormBackground;