"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioToggleProps {
  calmLevel: number;
}

const AudioToggle: React.FC<AudioToggleProps> = ({ calmLevel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const stormAudioRef = useRef<HTMLAudioElement | null>(null);
  const calmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    stormAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    calmAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
    
    if (stormAudioRef.current) {
      stormAudioRef.current.loop = true;
      stormAudioRef.current.volume = 0;
    }
    if (calmAudioRef.current) {
      calmAudioRef.current.loop = true;
      calmAudioRef.current.volume = 0;
    }

    return () => {
      stormAudioRef.current?.pause();
      calmAudioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      stormAudioRef.current?.pause();
      calmAudioRef.current?.pause();
      return;
    }

    stormAudioRef.current?.play().catch(() => setIsPlaying(false));
    calmAudioRef.current?.play().catch(() => setIsPlaying(false));

    const stormVolume = Math.max(0, Math.min(1, (60 - calmLevel) / 60));
    const calmVolume = Math.max(0, Math.min(1, (calmLevel - 40) / 60));

    if (stormAudioRef.current) stormAudioRef.current.volume = stormVolume * 0.3;
    if (calmAudioRef.current) calmAudioRef.current.volume = calmVolume * 0.3;

  }, [isPlaying, calmLevel]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center space-x-4">
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-white/60 text-xs font-bold uppercase tracking-widest pointer-events-none"
          >
            {isPlaying ? 'Ambient Audio On' : 'Audio Muted'}
          </motion.span>
        )}
      </AnimatePresence>
      
      <Button
        variant="ghost"
        size="icon"
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        onClick={() => setIsPlaying(!isPlaying)}
        className={`relative w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 text-white transition-all duration-500 ${isPlaying ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}`}
      >
        {isPlaying && (
          <motion.div
            layoutId="audio-pulse"
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default AudioToggle;