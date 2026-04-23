"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Wind } from 'lucide-react';
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
  
  const stormAudioRef = useRef<HTMLAudioElement | null>(null);
  const calmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    stormAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    calmAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
    
    if (stormAudioRef.current) stormAudioRef.current.loop = true;
    if (calmAudioRef.current) calmAudioRef.current.loop = true;

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

    const stormBase = Math.max(0, Math.min(1, (60 - calmLevel) / 60));
    const calmBase = Math.max(0, Math.min(1, (calmLevel - 40) / 60));

    if (stormAudioRef.current) stormAudioRef.current.volume = stormBase * (masterVolume / 100);
    if (calmAudioRef.current) calmAudioRef.current.volume = calmBase * (masterVolume / 100);

  }, [isPlaying, calmLevel, masterVolume]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-4">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-6 rounded-[32px] w-64 shadow-2xl space-y-6"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Ambient Mix</span>
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
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl space-y-2">
                <Wind className={`w-4 h-4 ${calmLevel < 60 ? 'text-sky-400' : 'text-white/20'}`} />
                <span className="text-[8px] font-bold uppercase tracking-tighter text-white/40">Storm</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white/5 rounded-2xl space-y-2">
                <Music className={`w-4 h-4 ${calmLevel > 40 ? 'text-purple-400' : 'text-white/20'}`} />
                <span className="text-[8px] font-bold uppercase tracking-tighter text-white/40">Calm</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowPanel(!showPanel)}
          className={`w-14 h-14 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 text-white transition-all duration-500 ${showPanel ? 'bg-white/10 border-white/20' : ''}`}
        >
          <Music className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
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
    </div>
  );
};

export default AudioToggle;