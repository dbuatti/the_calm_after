import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AudioToggleProps {
  calmLevel: number;
}

const AudioToggle: React.FC<AudioToggleProps> = ({ calmLevel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const stormAudioRef = useRef<HTMLAudioElement | null>(null);
  const calmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using generic ambient sound URLs
    stormAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Placeholder for rain
    calmAudioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'); // Placeholder for birds
    
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

    // Crossfade based on calmLevel
    const stormVolume = Math.max(0, Math.min(1, (60 - calmLevel) / 60));
    const calmVolume = Math.max(0, Math.min(1, (calmLevel - 40) / 60));

    if (stormAudioRef.current) stormAudioRef.current.volume = stormVolume * 0.5;
    if (calmAudioRef.current) calmAudioRef.current.volume = calmVolume * 0.5;

  }, [isPlaying, calmLevel]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-6 right-6 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20"
    >
      {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </Button>
  );
};

export default AudioToggle;
