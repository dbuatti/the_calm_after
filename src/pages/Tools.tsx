"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wind,
  X,
  ChevronLeft,
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import StormBackground from "@/components/grounding/StormBackground";
import QuietModeToggle from "@/components/grounding/QuietModeToggle";
import { useDialogFocus } from "@/hooks/use-dialog-focus";
import { categories, getToolById, intensities, tools } from "@/data/tools";

const FAVORITES_KEY = "grounding-favorites";
const LAST_USED_KEY = "grounding-last-used";

function readFavorites(): string[] {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

const Tools = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [calmLevel, setCalmLevel] = useState(60);
  const [favorites, setFavorites] = useState<string[]>(readFavorites);
  const [lastUsed, setLastUsed] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LAST_USED_KEY);
    } catch {
      return null;
    }
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filters and the open tool live in the URL so Home's shortcuts, the check-in
  // suggestions and the browser back button all describe the same state.
  const searchQuery = searchParams.get("q") ?? "";
  const rawCategory = searchParams.get("category");
  const categoryFilter = categories.includes(rawCategory as (typeof categories)[number])
    ? (rawCategory as string)
    : "All";
  const rawIntensity = searchParams.get("intensity");
  const intensityFilter = intensities.includes(rawIntensity as (typeof intensities)[number])
    ? (rawIntensity as string)
    : "All";
  const isPanicMode = searchParams.get("panic") === "true";
  const activeTool = getToolById(searchParams.get("tool"));

  const updateParams = useCallback(
    (updates: Record<string, string | null>, replace = true) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "" || value === "All") next.delete(key);
            else next.set(key, value);
          });
          return next;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  const closeTool = useCallback(() => {
    updateParams({ tool: null });
  }, [updateParams]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Favorites still work for this visit if storage is unavailable.
    }
  }, [favorites]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("set-calm-level", { detail: calmLevel }));
  }, [calmLevel]);

  useDialogFocus(Boolean(activeTool), dialogRef, closeTool, closeButtonRef);

  const toggleFavorite = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favorite) => favorite !== id) : [...prev, id],
    );
  };

  const handleToolClick = (id: string) => {
    setLastUsed(id);
    try {
      localStorage.setItem(LAST_USED_KEY, id);
    } catch {
      // Recent tool still works for this visit if storage is unavailable.
    }
    updateParams({ tool: id });
  };

  const filteredTools = useMemo(
    () =>
      tools.filter((tool) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch =
          !query ||
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query);
        const matchesCategory = categoryFilter === "All" || tool.type === categoryFilter;
        const matchesIntensity = intensityFilter === "All" || tool.intensity === intensityFilter;
        const matchesPanic = !isPanicMode || ("panic" in tool && tool.panic === true);
        return matchesSearch && matchesCategory && matchesIntensity && matchesPanic;
      }),
    [searchQuery, categoryFilter, intensityFilter, isPanicMode],
  );

  const hasFilters = Boolean(
    searchQuery || categoryFilter !== "All" || intensityFilter !== "All" || isPanicMode,
  );
  const clearFilters = () => updateParams({ q: null, category: null, intensity: null, panic: null });

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-12 relative overflow-hidden">
      <StormBackground calmLevel={calmLevel} />

      <header className="z-10 flex flex-col items-center mb-8 md:mb-12 max-w-6xl mx-auto w-full gap-6 md:gap-8">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white/40 hover:text-white hover:bg-white/10 rounded-full px-4 md:px-6 h-10 md:h-12 font-bold uppercase tracking-widest text-[10px]"
          >
            <ChevronLeft className="mr-1 md:mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase">Toolbox</h1>
          <div className="w-16 md:w-24" />
        </div>

        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-col md:flex-row items-center gap-4 w-full">
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" aria-hidden="true" />
              <Input
                ref={searchInputRef}
                type="search"
                aria-label="Search tools"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(event) => updateParams({ q: event.target.value })}
                className="bg-white/5 border-white/10 rounded-full pl-12 pr-12 h-14 text-white placeholder:text-white/20 focus:ring-sky-500/50"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Clear search"
                  onClick={() => {
                    updateParams({ q: null });
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white rounded-full w-10 h-10"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <Button
              onClick={() => updateParams({ panic: isPanicMode ? null : "true" })}
              aria-pressed={isPanicMode}
              className={`w-full md:w-auto h-14 rounded-full px-8 font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${
                isPanicMode
                  ? "bg-rose-500 text-white shadow-[0_0_30px_rgba(244,63,94,0.4)]"
                  : "bg-white/5 border border-white/10 text-rose-400 hover:bg-rose-500/10"
              }`}
            >
              <AlertCircle className={`mr-2 h-4 w-4 ${isPanicMode ? "animate-pulse" : ""}`} aria-hidden="true" />
              {isPanicMode ? "Panic mode on" : "Panic mode"}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div
              className="flex bg-white/5 p-1.5 rounded-full border border-white/10 w-full overflow-x-auto no-scrollbar"
              role="group"
              aria-label="Filter by type"
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  size="sm"
                  aria-pressed={categoryFilter === category}
                  onClick={() => updateParams({ category: category === "All" ? null : category })}
                  className={`shrink-0 rounded-full px-6 h-11 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                    categoryFilter === category
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div
              className="flex bg-white/5 p-1.5 rounded-full border border-white/10 md:w-auto overflow-x-auto no-scrollbar"
              role="group"
              aria-label="Filter by intensity"
            >
              {intensities.map((intensity) => (
                <Button
                  key={intensity}
                  variant="ghost"
                  size="sm"
                  aria-pressed={intensityFilter === intensity}
                  onClick={() => updateParams({ intensity: intensity === "All" ? null : intensity })}
                  className={`shrink-0 rounded-full px-5 h-11 text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all ${
                    intensityFilter === intensity
                      ? "bg-sky-400 text-slate-950 shadow-lg"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {intensity}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="z-10 flex-1 max-w-6xl mx-auto w-full space-y-6 md:space-y-8">
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[40px] flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 shrink-0">
              <SlidersHorizontal className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-widest">
                Set the scene
              </h4>
              <p className="text-[9px] md:text-xs text-white/40">
                The background follows the storm. Quiet visuals removes rain, flashes and movement.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full lg:w-auto">
            <div className="flex-1 min-w-[180px] max-w-md flex items-center space-x-4 md:space-x-6">
              <span className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest">Stormy</span>
              <Slider
                aria-label="Background intensity"
                value={[calmLevel]}
                onValueChange={(value) => setCalmLevel(value[0])}
                max={100}
                step={1}
                className="cursor-pointer"
              />
              <span className="text-[8px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest">Clear</span>
            </div>
            <QuietModeToggle compact />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40" aria-live="polite">
            Showing {filteredTools.length} of {tools.length} tools
          </p>
          {hasFilters && (
            <Button
              variant="link"
              onClick={clearFilters}
              className="text-sky-400/70 text-[10px] font-bold uppercase tracking-widest hover:text-sky-300 h-auto p-0"
            >
              Clear all filters
            </Button>
          )}
        </div>

        {isPanicMode && (
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-rose-100/70">
            <span>Showing only short tools for acute panic. You can switch this off at any time.</span>
            <a href="tel:131114" className="font-bold underline underline-offset-4 hover:text-white">
              Need to talk? Call Lifeline 13 11 14
            </a>
          </div>
        )}

        {filteredTools.length === 0 ? (
          <div className="rounded-[40px] border border-white/10 bg-white/[0.03] p-12 text-center space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">No tools match those filters</h2>
              <p className="text-sm text-white/40">Nothing is wrong — try clearing the filters.</p>
            </div>
            <Button
              onClick={clearFilters}
              className="rounded-full bg-white text-slate-950 font-bold uppercase tracking-widest text-xs px-8 h-12"
            >
              Show all tools
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${tool.title}`}
                    className={`bg-white/[0.03] backdrop-blur-2xl border-white/10 text-white hover:bg-white/[0.08] transition-all duration-500 cursor-pointer group h-full overflow-hidden rounded-[48px] active:scale-[0.98] relative ${
                      lastUsed === tool.id ? "ring-2 ring-sky-500/20" : ""
                    }`}
                    onClick={() => handleToolClick(tool.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleToolClick(tool.id);
                      }
                    }}
                  >
                    <CardContent className="p-8 md:p-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6 md:mb-8">
                        <div
                          className={`w-14 h-14 md:w-16 md:h-16 ${tool.bg} rounded-[24px] flex items-center justify-center ${tool.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                        >
                          <tool.icon className="w-7 h-7 md:w-8 md:h-8" aria-hidden="true" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className="bg-white/5 border-white/10 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 flex items-center"
                          >
                            <Clock className="w-3 h-3 mr-1" aria-hidden="true" /> {tool.duration}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={favorites.includes(tool.id) ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
                            aria-pressed={favorites.includes(tool.id)}
                            onClick={(event) => toggleFavorite(event, tool.id)}
                            className={`w-8 h-8 rounded-full transition-colors ${
                              favorites.includes(tool.id)
                                ? "text-amber-400 bg-amber-400/10"
                                : "text-white/20 hover:text-white/40"
                            }`}
                          >
                            <Star className={`w-4 h-4 ${favorites.includes(tool.id) ? "fill-current" : ""}`} aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xl md:text-2xl font-bold tracking-tight">{tool.title}</h3>
                          <Badge
                            variant="outline"
                            className="bg-white/5 border-white/10 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 shrink-0"
                          >
                            {tool.type}
                          </Badge>
                        </div>
                        <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{tool.description}</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">
                          {tool.intensity} intensity
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeTool();
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/95 backdrop-blur-2xl"
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="tool-dialog-title"
              tabIndex={-1}
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-white/[0.02] border border-white/10 rounded-[56px] shadow-2xl overflow-hidden relative backdrop-blur-3xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <Button
                ref={closeButtonRef}
                variant="ghost"
                size="icon"
                aria-label="Close tool"
                onClick={closeTool}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-white/20 hover:text-white hover:bg-white/10 z-10 rounded-full w-10 h-10 md:w-12 md:h-12"
              >
                <X className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
              </Button>

              <div className="p-8 md:p-20 flex flex-col items-center space-y-8 md:space-y-12">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {activeTool.type}
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                      {activeTool.duration}
                    </Badge>
                  </div>
                  <h2 id="tool-dialog-title" className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                    {activeTool.title}
                  </h2>
                  <p className="text-white/40 text-base md:text-lg font-light max-w-md mx-auto">{activeTool.description}</p>
                </div>

                <div className="w-full">{activeTool.component}</div>

                <div className="w-full bg-white/5 border border-white/10 rounded-[32px] p-6 flex items-start space-x-4">
                  <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 shrink-0">
                    <Wind className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Why it works</h4>
                    <p className="text-xs text-white/60 leading-relaxed italic">{activeTool.science}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 w-full">
                  <Button
                    onClick={closeTool}
                    className="bg-white text-slate-950 hover:bg-sky-100 px-12 md:px-20 h-16 rounded-full font-black text-base md:text-lg shadow-2xl shadow-white/10 uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    Done for now
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => {
                      closeTool();
                      window.setTimeout(() => searchInputRef.current?.focus(), 0);
                    }}
                    className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest h-auto p-0"
                  >
                    Didn't help? Try another tool
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tools;
