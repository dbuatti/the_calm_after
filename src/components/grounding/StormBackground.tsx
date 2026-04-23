import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StormBackgroundProps {
  calmLevel: number; // 0 (Stormy) to 100 (Clear)
}

const StormBackground: React.FC<StormBackgroundProps> = ({ calmLevel }) => {
  // Interpolate colors based on calmLevel
  // 0: slate-950 (dark storm)
  // 50: slate-600 (overcast)
  // 100: sky-200 (clear day)
  
  const getBgColor = () => {
    if (calmLevel < 30) return 'bg-slate-950';
    if (calmLevel < 60) return 'bg-slate-800';
    if (calmLevel < 90) return 'bg-sky-400';
    return 'bg-sky-200';
  };

  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-1000 ease-in-out ${getBgColor()}`}>
      {/* Storm Clouds / Rain Effect (Visible when calmLevel is low) */}
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
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-px h-20 bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                  }}
                  animate={{
                    top: ['-10%', '110%'],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
            {/* Clouds */}
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-slate-900/40 blur-3xl"
                  style={{
                    width: `${300 + Math.random() * 400}px`,
                    height: `${200 + Math.random() * 300}px`,
                    left: `${Math.random() * 100 - 20}%`,
                    top: `${Math.random() * 100 - 20}%`,
                  }}
                  animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sun / Brightness (Visible when calmLevel is high) */}
      <AnimatePresence>
        {calmLevel > 40 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: (calmLevel - 40) / 60 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default StormBackground;
