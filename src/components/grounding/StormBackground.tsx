"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StormBackgroundProps {
  calmLevel: number; // 0 (Stormy) to 100 (Clear)
}

const StormBackground: React.FC<StormBackgroundProps> = ({ calmLevel }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightning, setLightning] = useState(false);

  // Mouse parallax effect
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

  // Rain Canvas Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const particleCount = Math.max(0, Math.floor((100 - calmLevel) * 2.5)); // More rain when less calm

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class RainDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 20 + 10;
        this.speed = Math.random() * 15 + 10;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
          this.y = -this.length;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(173, 216, 230, ${this.opacity * ((100 - calmLevel) / 100)})`;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + (100 - calmLevel) / 50, this.y + this.length); // Slight wind angle
        ctx.stroke();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new RainDrop());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [calmLevel]);

  // Lightning Logic
  useEffect(() => {
    if (calmLevel > 30) {
      setLightning(false);
      return;
    }

    const triggerLightning = () => {
      if (Math.random() > 0.97) {
        setLightning(true);
        setTimeout(() => setLightning(false), Math.random() * 100 + 50);
      }
    };

    const interval = setInterval(triggerLightning, 200);
    return () => clearInterval(interval);
  }, [calmLevel]);

  // Dynamic color mapping based on calmLevel
  const getColors = () => {
    if (calmLevel < 30) return {
      bg: lightning ? 'bg-slate-800' : 'bg-[#020617]', // Flash effect
      blob1: lightning ? 'bg-sky-400/40' : 'bg-indigo-900/30',
      blob2: 'bg-blue-900/20',
      blob3: 'bg-slate-900/40'
    };
    if (calmLevel < 70) return {
      bg: 'bg-[#0f172a]', 
      blob1: 'bg-sky-900/30',
      blob2: 'bg-indigo-800/20',
      blob3: 'bg-violet-900/30'
    };
    return {
      bg: 'bg-[#075985]', 
      blob1: 'bg-sky-400/30',
      blob2: 'bg-amber-200/20',
      blob3: 'bg-indigo-400/20'
    };
  };

  const colors = getColors();

  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-[1000ms] ease-in-out ${colors.bg}`}>
      {/* HTML5 Canvas Rain Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ filter: 'blur(0.5px)' }}
      />

      {/* Mesh Blobs */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 50, stiffness: 50 }}
      >
        <motion.div 
          className={`absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full blur-[140px] transition-colors duration-[1000ms] ${colors.blob1}`}
          animate={{ 
            x: [0, 60, 0], 
            y: [0, 40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] transition-colors duration-[1000ms] ${colors.blob2}`}
          animate={{ 
            x: [0, -50, 0], 
            y: [0, -70, 0],
            scale: [1, 1.25, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className={`absolute top-[15%] right-[5%] w-[60%] h-[60%] rounded-full blur-[140px] transition-colors duration-[1000ms] ${colors.blob3}`}
          animate={{ 
            x: [0, 40, 0], 
            y: [0, 60, 0],
            scale: [1, 0.95, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      {/* Atmospheric Depth Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

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
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-rose-500/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StormBackground;