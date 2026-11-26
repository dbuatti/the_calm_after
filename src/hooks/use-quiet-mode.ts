import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "grounding-quiet-mode";
const CHANGE_EVENT = "quiet-mode-change";

function readStoredPreference(): boolean | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return null;
    return raw === "true";
  } catch {
    return null;
  }
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Quiet mode removes rain, lightning, parallax, pulsing and other background
 * movement. It is opt-in, persistent, and follows the OS reduced-motion
 * setting until the person chooses otherwise.
 */
export function useQuietMode() {
  const [quietMode, setQuietModeState] = useState<boolean>(
    () => readStoredPreference() ?? prefersReducedMotion(),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("quiet-mode", quietMode);
  }, [quietMode]);

  useEffect(() => {
    const handleChange = (event: Event) => {
      setQuietModeState((event as CustomEvent<boolean>).detail);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue !== null) {
        setQuietModeState(event.newValue === "true");
      }
    };

    window.addEventListener(CHANGE_EVENT, handleChange);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const setQuietMode = useCallback((value: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // Preferences still apply for this visit if storage is unavailable.
    }
    setQuietModeState(value);
    window.dispatchEvent(new CustomEvent<boolean>(CHANGE_EVENT, { detail: value }));
  }, []);

  const toggleQuietMode = useCallback(() => {
    setQuietMode(!quietMode);
  }, [quietMode, setQuietMode]);

  return { quietMode, setQuietMode, toggleQuietMode };
}

export default useQuietMode;
