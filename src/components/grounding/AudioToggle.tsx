"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Wind, Waves, Bird, Settings2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

interface AudioToggleProps {
  calmLevel: number;
}

const AudioToggle: React.FC<AudioToggleProps> = ({ calmLevel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [masterVolume, setMasterVolume] = useState(30);
  const [activeSound, setActiveSound] = useState<'ambient' | 'waves' | 'forest' | 'healing'>('ambient');
  
  const stormAudioRef = useRef<HTMLAudioElement | null>(null);
  const calmAudioRef = useRef<HTMLAudioElement | null>(null);
  const wavesAudioRef = useRef<HTMLAudioElement | null>(null);
  const forestAudioRef = useRef<HTMLAudioElement | null>(null);
  const healingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Standard soundscapes
    stormAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    calmAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
    wavesAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3');
    forestAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3');
    
    // Your custom meditation track (expects file at public/crystal-waves.mp3)
    healingAudioRef.current = new Audio('/crystal-waves.mp3');
    
    const allRefs = [stormAudioRef, calmAudioRef, wavesAudioRef, forestAudioRef, healingAudioRef];
    
    allRefs.forEach(ref => {
      if (ref.current) {
        ref.current.loop = true;
        ref.current.preload = 'auto';
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      allRefs.forEach(ref => ref.current?.pause());
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const allRefs = [stormAudioRef, calmAudioRef, wavesAudioRef, forestAudioRef, healingAudioRef];
    
    if (!isPlaying) {
      allRefs.forEach(ref => ref.current?.pause());
      return;
    }

    // Pause everything first to ensure clean transitions
    allRefs.forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.volume = 0;
      }
    });

    if (activeSound === 'ambient') {
      stormAudioRef.current?.play().catch(() => {});
      calmAudioRef.current?.play().catch(() => {});
      
      const stormBase = Math.max(0, Math.min(1, (60 - calmLevel) / 60));
      const calmBase = Math.max(0, Math.min(1, (calmLevel - 40) / 60));
      
      if (stormAudioRef.current) stormAudioRef.current.volume = stormBase * (masterVolume / 100);
      if (calmAudioRef.current) calmAudioRef.current.volume = calmBase * (masterVolume / 100);
    } 
    else if (activeSound === 'waves') {
      wavesAudioRef.current?.play().catch(() => {});
      if (wavesAudioRef.current) wavesAudioRef.current.volume = masterVolume / 100;
    } 
    else if (activeSound === 'forest') {
      forestAudioRef.current?.play().catch(() => {});
      if (forestAudioRef.current) forestAudioRef.current.volume = masterVolume / 100;
    }
    else if (activeSound === 'healing') {
      healingAudioRef.current?.play().catch(() => {});
      if (healingAudioRef.current) healingAudioRef.current.volume = masterVolume / 100;
    }

  }, [isPlaying, calmLevel, masterVolume, activeSound]);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[60] flex flex-col items-end space-y-4">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-slate-950/40 backdrop-blur-3xl border border-white/10 p-6 rounded-[40px] w-80 shadow-2xl space-y-8"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Master Volume</span>
                <span className="text-[10px] font-bold text-white/60">{masterVolume}%</span>
              </div>
              <Slider 
                value={[masterVolume]} 
                onValueChange={(v) => setMasterVolume(v[0])} 
                max={100} 
                step={1}
                className="cursor-pointer"
              />
            </div>
            
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Soundscape</span>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setActiveSound('ambient')}
                  className={`flex flex-col items-center h-20 rounded-2xl space-y-2 transition-all ${activeSound === 'ambient' ? 'bg-white/10 text-sky-400' : 'bg-white/5 text-white/20'}`}
                >
                  <Wind className="w-5 h-5" />
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Storm</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveSound('healing')}
                  className={`flex flex-col items-center h-20 rounded-2xl space-y-2 transition-all ${activeSound === 'healing' ? 'bg-white/10 text-amber-400' : 'bg-white/5 text-white/20'}`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Healing</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveSound('waves')}
                  className={`flex flex-col items-center h-20 rounded-2xl space-y-2 transition-all ${activeSound === 'waves' ? 'bg-white/10 text-blue-400' : 'bg-white/5 text-white/20'}`}
                >
                  <Waves className="w-5 h-5" />
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Waves</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveSound('forest')}
                  className={`flex flex-col items-center h-20 rounded-2xl space-y-2 transition-all ${activeSound === 'forest' ? 'bg-white/10 text-emerald-400' : 'bg-white/5 text-white/20'}`}
                >
                  <Bird className="w-5 h-5" />
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Forest</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowPanel(!showPanel)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 text-white transition-all duration-500 ${showPanel ? 'bg-white/10 border-white/20 rotate-90' : ''}`}
        >
          <Settings2 className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 text-white transition-all duration-500 ${isPlaying ? 'shadow-[0_0_30px_rgba(255,255,255,0.1)]' : ''}`}
        >
          {isPlaying && (
            <motion.div
              layoutId="audio-pulse"
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          {isPlaying ? <Volume2 className="h-6 w-6 md:h-7 md:w-7" /> : <VolumeX className="h-6 w-6 md:h-7 md:w-7" />}
        </Button>
      </div>
      <div className="hidden md:block text-[8px] font-bold text-white/10 uppercase tracking-widest pr-2">Press 'M' to Mute</div>
    </div>
  );
};

export default AudioToggle;