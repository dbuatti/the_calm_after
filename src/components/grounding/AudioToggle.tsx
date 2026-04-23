"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Settings2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { toast } from "sonner";

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [masterVolume, setMasterVolume] = useState(30);
  const healingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the healing meditation track
    const healingAudio = new Audio('/crystal-waves.mp3');
    healingAudio.loop = true;
    healingAudio.preload = 'auto';
    
    healingAudio.addEventListener('error', (e) => {
      console.error("Failed to load crystal-waves.mp3. Ensure it is in the public/ folder.", e);
    });
    
    healingAudioRef.current = healingAudio;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      healingAudioRef.current?.pause();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const audio = healingAudioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.pause();
      return;
    }

    const playAudio = async () => {
      try {
        audio.volume = masterVolume / 100;
        await audio.play();
      } catch (err) {
        console.error("Playback failed:", err);
        toast.error("Could not play 'crystal-waves.mp3'. Check if the file exists in the public folder.");
      }
    };

    playAudio();
  }, [isPlaying, masterVolume]);

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
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Active Soundscape</span>
              <div className="flex items-center p-4 bg-white/5 rounded-2xl space-x-4 border border-white/5">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white uppercase tracking-tight">Healing Frequencies</div>
                  <div className="text-[8px] text-white/40 uppercase tracking-widest">Crystal Waves</div>
                </div>
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