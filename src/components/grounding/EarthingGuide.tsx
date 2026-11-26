"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Footprints, Zap, Moon, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const DURATION = 600;

const notes = [
  { icon: Footprints, title: "Feel the ground", desc: "Notice the texture and temperature under your feet. This is the grounding part — no special equipment needed." },
  { icon: Zap, title: "Slow your pace", desc: "Standing still for a few minutes gives your attention somewhere steady to rest." },
  { icon: Moon, title: "Let it count", desc: "Even a short pause outside can be a useful reset. Stay as long as feels comfortable." },
];

const EarthingGuide = () => {
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const timeout = window.setTimeout(() => setTimeLeft((previous) => previous - 1), 1000);
    return () => window.clearTimeout(timeout);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive && timeLeft === 0) {
      setIsActive(false);
      setIsFinished(true);
    }
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const startOrResume = () => {
    if (isFinished || timeLeft === 0) {
      setTimeLeft(DURATION);
      setIsFinished(false);
    }
    setHasStarted(true);
    setIsActive(true);
  };

  const reset = () => {
    setIsActive(false);
    setIsFinished(false);
    setHasStarted(false);
    setTimeLeft(DURATION);
  };

  const status = isFinished
    ? "Session complete. Take a breath and notice how you feel."
    : isActive
      ? "Session running"
      : hasStarted
        ? "Paused"
        : "Ready when you are";

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {!showNotes ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white/5 rounded-[32px] p-8 text-center space-y-6 border border-white/10">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                <Footprints className="w-10 h-10" aria-hidden="true" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Physical Earthing</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Find a patch of grass, soil or sand. Take off your shoes and notice the contact under your feet.
              </p>
            </div>

            <div className="space-y-4">
              <div
                role="timer"
                aria-label={`${formatTime(timeLeft)} remaining`}
                className="text-4xl font-black text-white tabular-nums"
              >
                {formatTime(timeLeft)}
              </div>
              <Progress value={(timeLeft / DURATION) * 100} aria-label="Earthing session progress" className="h-1 bg-white/5" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30" aria-live="polite">
                {status}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={isActive ? () => setIsActive(false) : startOrResume}
                  className={`${isActive ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500 text-white"} rounded-full px-8`}
                >
                  {isActive ? "Pause" : isFinished ? "Start again" : timeLeft === DURATION ? "Start 10m session" : "Resume"}
                </Button>
                {(isActive || isFinished || hasStarted) && (
                  <Button variant="ghost" onClick={reset} className="rounded-full text-white/40 hover:text-white">
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={() => setShowNotes(true)}
            className="w-full text-sky-400/60 hover:text-sky-400 text-[10px] font-bold uppercase tracking-widest"
          >
            <Info className="w-4 h-4 mr-2" aria-hidden="true" /> Why this might help
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <p className="text-xs text-white/30 text-center">
            A note on the evidence: grounding exercises can help attention and calm. Claims about curing medical conditions are not established — use this as a sensory practice.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {notes.map((note) => (
              <div key={note.title} className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-sky-400 shrink-0">
                  <note.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{note.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{note.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowNotes(false)}
            className="w-full border-white/10 text-white/40 rounded-full"
          >
            Back to timer
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default EarthingGuide;
