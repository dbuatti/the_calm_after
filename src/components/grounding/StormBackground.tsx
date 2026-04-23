"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StormBackgroundProps {
  calmLevel: number; // 0 (Stormy) to 100 (Clear)
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const StormBackground: React.FC<StormBackgroundProps> = ({ calmLevel }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples(prev => [...prev.slice(-5), newRipple]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const getBgStyles = () => {
    // Deep Stormy (0-30)
    if (calmLevel < 30) return 'from-[#020617] via-[#0f172a] to-[#1e1b4b]';
    // Transitioning (30-60)
    if (calmLevel < 60) return 'from-[#0f172a] via-[#1e293b] to-[#312e81]';
    // Clearing (60-90)
    if (calmLevel < 90) return 'from-[#075985] via-[#0ea5e9] to-[#818cf8]';
    // Golden Hour / Clear (90-100)
    return 'from-[#bae6fd] via-[#fef3c7] to-[#fff7ed]';
  };

  return (
    <div className={`fixed inset-0 -z-10 transition-all duration-[2000ms] ease-in-out bg-gradient-to-br ${getBgStyles()}`}>
      {/* Parallax Container */}
      <motion.div 
        className="absolute inset-0"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 60, stiffness: 80 }}
      >
        {/* Ripples */}
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute w-32 h-32 border border-white/10 rounded-full pointer-events-none"
              style={{ left: ripple.x - 64, top: ripple.y - 64 }}
              onAnimationComplete={() => setRipples(prev => prev.filter(r => r.id !== ripple.id))}
            />
          ))}
        </AnimatePresence>

        {/* Storm Layer */}
        <AnimatePresence>
          {calmLevel < 70 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: (70 - calmLevel) / 70 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 overflow-hidden pointer-events-none"
            >
              {/* Rain drops */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-px h-32 bg-white/30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `-10%`,
                    }}
                    animate={{
                      top: ['-10%', '110%'],
                    }}
                    transition={{
                      duration: 0.3 + Math.random() * 0.3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
              
              {/* Mist/Clouds */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-slate-900/20 blur-[120px]"
                    style={{
                      width: `${500 + Math.random() * 700}px`,
                      height: `${400 + Math.random() * 500}px`,
                      left: `${Math.random() * 100 - 20}%`,
                      top: `${Math.random() * 100 - 20}%`,
                    }}
                    animate={{
                      x: [0, 150, 0],
                      y: [0, 80, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 20 + Math.random() * 20,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sun / Warmth Layer */}
        <AnimatePresence>
          {calmLevel > 30 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: (calmLevel - 30) / 70 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-amber-200/10 rounded-full blur-[150px]" />
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white/10 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default StormBackground;