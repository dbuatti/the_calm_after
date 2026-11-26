"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Smile, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const affirmations = [
  "You are having a rough time, but you will make it through.",
  "You are strong, and you can move through this pain.",
  "You are trying hard, and you are doing your best.",
  "This moment is tough, but it is only a moment.",
  "You are safe in this space, at this time.",
];

const tabs = [
  { id: "affirm", label: "Affirmations", icon: Sparkles },
  { id: "favorites", label: "Favourites", icon: List },
  { id: "loved", label: "Loved one", icon: Heart },
] as const;

type Tab = (typeof tabs)[number]["id"];

const SoothingSanctuary = () => {
  const [step, setStep] = useState<Tab>("affirm");
  const [affIdx, setAffIdx] = useState(0);

  return (
    <div className="w-full max-w-md mx-auto space-y-8 py-4">
      <div className="flex justify-center space-x-3" aria-label="Comforting thoughts">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            type="button"
            aria-pressed={step === tab.id}
            aria-label={tab.label}
            title={tab.label}
            onClick={() => setStep(tab.id)}
            className={`rounded-full px-5 ${step === tab.id ? "bg-white text-slate-950" : "text-white/30 hover:text-white bg-white/5"}`}
          >
            <tab.icon className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">{tab.label}</span>
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "affirm" && (
          <motion.div key="aff" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center space-y-6">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center text-rose-400 mx-auto">
              <Smile className="w-8 h-8" aria-hidden="true" />
            </div>
            <p className="text-2xl font-light text-white leading-relaxed italic" role="status" aria-live="polite">
              “{affirmations[affIdx]}”
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/25">
              Thought {affIdx + 1} of {affirmations.length}
            </p>
            <Button onClick={() => setAffIdx((affIdx + 1) % affirmations.length)} variant="outline" className="rounded-full border-white/10 text-white/60">
              Another thought
            </Button>
          </motion.div>
        )}

        {step === "favorites" && (
          <motion.div key="fav" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
            <h3 className="text-xl font-bold text-white text-center">List 3 Favourites</h3>
            <div className="space-y-3">
              {["Favourite foods", "Favourite songs", "Favourite places"].map((category) => (
                <div key={category} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-sm font-medium text-white/60">{category}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-white/30 leading-relaxed">
              No need to write them down — just name them in your mind. Nothing here is being tracked.
            </p>
          </motion.div>
        )}

        {step === "loved" && (
          <motion.div key="love" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="text-center space-y-6">
            <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-400 mx-auto">
              <Heart className="w-8 h-8" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-white">Visualise a Loved One</h3>
            <p className="text-white/40 text-sm leading-relaxed">
              Close your eyes. Picture the face of someone who makes you feel safe. Imagine their voice telling you:{" "}
              <span className="text-amber-400/60 italic mt-2 block">“This is tough, but you’ll get through it.”</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SoothingSanctuary;
