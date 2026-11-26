"use client";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  Wind,
  ArrowRight,
  Sparkles,
  Heart,
  AlertCircle,
  Brain,
  Star,
  Clock,
  LayoutGrid,
} from "lucide-react";
import StormBackground from "@/components/grounding/StormBackground";
import MoodMeter from "@/components/grounding/MoodMeter";
import MindfulQuotes from "@/components/grounding/MindfulQuotes";
import CrisisFooter from "@/components/grounding/CrisisFooter";
import { getToolById, toolHref, tools } from "@/data/tools";

const FAVORITES_KEY = "grounding-favorites";
const LAST_USED_KEY = "grounding-last-used";

function readFavorites(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

const greetingForHour = (hour: number) => {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const paths = [
  {
    id: "panic",
    eyebrow: "Right now",
    title: "Panic or overwhelm",
    description: "Six short exercises that need no setup. Start with one and stop whenever you want.",
    action: "/tools?panic=true",
    icon: AlertCircle,
    accent: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    id: "racing",
    eyebrow: "Can't switch off",
    title: "Racing thoughts",
    description: "Logic-based tools that give a busy mind something steady to hold onto.",
    action: "/tools?category=Mental",
    icon: Brain,
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    id: "reset",
    eyebrow: "Have a little time",
    title: "Guided reset",
    description: "Six gentle steps, about 12 minutes. You can skip any step or leave at any point.",
    action: "/session",
    icon: Wind,
    accent: "text-sky-400",
    bg: "bg-sky-500/10",
  },
] as const;

const Index = () => {
  const navigate = useNavigate();
  const [favorites] = useState<string[]>(readFavorites);
  const [lastUsedId, setLastUsedId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LAST_USED_KEY);
    } catch {
      return null;
    }
  });
  const greeting = greetingForHour(new Date().getHours());

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("set-calm-level", { detail: 20 }));
  }, []);

  const handleMoodSuggest = (intensity: string) => {
    navigate(`/tools?intensity=${encodeURIComponent(intensity)}`);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 16, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 22 },
    },
  };

  const recentTool = getToolById(lastUsedId);
  const favoriteTools = favorites.map(getToolById).filter((tool) => tool !== undefined);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-6 relative overflow-hidden">
      <StormBackground calmLevel={20} />
      <MoodMeter onSuggest={handleMoodSuggest} />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-6xl mx-auto space-y-12 md:space-y-16 py-8 md:py-12"
      >
        <header className="text-center space-y-6 md:space-y-8">
          <div className="space-y-4">
            <MindfulQuotes />
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 px-5 py-2 bg-white/5 rounded-full border border-white/10 text-sky-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3" aria-hidden="true" />
              <span>{greeting}</span>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="space-y-5">
            <h1 className="text-5xl md:text-[110px] font-black tracking-tighter leading-[0.85] md:leading-[0.8] uppercase text-lume">
              The Calm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-200">After</span>
            </h1>
            <p className="text-base md:text-xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed tracking-tight px-4">
              A quiet place to steady yourself. Pick one thing below — there is no right answer and nothing to finish.
            </p>
          </motion.div>
        </header>

        <motion.section variants={itemVariants} className="space-y-5" aria-labelledby="start-here-heading">
          <div className="flex flex-col gap-1 px-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h2 id="start-here-heading" className="text-[10px] md:text-xs font-black text-white/60 uppercase tracking-[0.4em]">
              Start here
            </h2>
            <span className="text-[9px] md:text-[10px] text-white/25 uppercase tracking-widest sm:text-right">
              Choose what fits right now
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {paths.map((path) => (
              <button
                key={path.id}
                type="button"
                onClick={() => navigate(path.action)}
                className="group flex min-h-[220px] w-full flex-col items-stretch justify-between gap-8 rounded-[40px] border border-white/10 bg-white/[0.03] p-7 text-left transition-all hover:bg-white/[0.07] active:scale-[0.98] md:min-h-[260px] md:p-9 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
              >
                <div className="w-full space-y-5">
                  <div className={`w-14 h-14 ${path.bg} ${path.accent} rounded-[22px] flex items-center justify-center`}>
                    <path.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-white/25">{path.eyebrow}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{path.title}</h3>
                  </div>
                </div>
                <div className="w-full space-y-4">
                  <p className="text-xs md:text-sm text-white/40 font-light leading-relaxed">{path.description}</p>
                  <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-sky-300">
                    Go <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" aria-hidden="true" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {(recentTool || favoriteTools.length > 0) && (
          <motion.section variants={itemVariants} className="space-y-5" aria-labelledby="quick-access-heading">
            <div className="flex items-center justify-between px-2">
              <h2 id="quick-access-heading" className="text-[10px] md:text-xs font-black text-white/60 uppercase tracking-[0.4em]">
                Quick access
              </h2>
              <button
                type="button"
                onClick={() => navigate("/tools")}
                className="rounded p-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-sky-400/60 hover:text-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                View all {tools.length}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recentTool && (
                <button
                  type="button"
                  onClick={() => navigate(toolHref(recentTool.id))}
                  className="flex min-h-[104px] w-full items-start gap-4 rounded-[32px] border border-white/10 bg-white/[0.02] px-6 py-5 text-left transition-all hover:bg-white/[0.06] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
                >
                  <div className="w-10 h-10 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 shrink-0">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[8px] md:text-[9px] font-bold text-white/25 uppercase tracking-widest">Last used</div>
                    <div className="text-sm md:text-base font-bold text-white">{recentTool.title}</div>
                  </div>
                </button>
              )}
              {favoriteTools.slice(0, recentTool ? 2 : 3).map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => navigate(toolHref(tool.id))}
                  className="flex min-h-[104px] w-full items-start gap-4 rounded-[32px] border border-white/10 bg-white/[0.02] px-6 py-5 text-left transition-all hover:bg-white/[0.06] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
                >
                  <div className="w-10 h-10 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 shrink-0">
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[8px] md:text-[9px] font-bold text-white/25 uppercase tracking-widest">Favorite</div>
                    <div className="text-sm md:text-base font-bold text-white">{tool.title}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>
        )}

        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={() => navigate("/tools")}
            className="group flex min-h-[100px] w-full items-center justify-between gap-6 rounded-[36px] border border-white/10 bg-white/[0.02] px-8 text-left transition-all hover:bg-white/[0.06] md:px-12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
          >
            <span className="flex min-w-0 items-center gap-5">
              <span className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 shrink-0">
                <LayoutGrid className="w-6 h-6" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-lg md:text-2xl font-bold text-white">Browse the whole toolbox</span>
                <span className="block text-xs md:text-sm text-white/40 font-light">All {tools.length} tools, searchable and sorted by what you need.</span>
              </span>
            </span>
            <ArrowRight className="h-6 w-6 shrink-0 text-white/40 transition-transform group-hover:translate-x-2" aria-hidden="true" />
          </button>
        </motion.div>

        <CrisisFooter />

        <motion.footer variants={itemVariants} className="text-center pt-4 md:pt-8 pb-8">
          <div className="inline-flex items-center space-x-4 px-8 md:px-10 py-4 md:py-5 bg-white/5 rounded-full border border-white/10 text-white/30 text-xs md:text-sm font-medium backdrop-blur-sm">
            <Heart className="w-4 h-4 text-rose-500/40" aria-hidden="true" />
            <span>Go at your own pace. Stop whenever you like.</span>
          </div>
        </motion.footer>
      </motion.main>
    </div>
  );
};

export default Index;
