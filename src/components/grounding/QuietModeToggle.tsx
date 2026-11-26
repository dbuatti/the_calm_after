import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuietMode } from "@/hooks/use-quiet-mode";

interface QuietModeToggleProps {
  compact?: boolean;
}

const QuietModeToggle = ({ compact = false }: QuietModeToggleProps) => {
  const { quietMode, toggleQuietMode } = useQuietMode();

  return (
    <Button
      type="button"
      variant="outline"
      size={compact ? "sm" : "default"}
      aria-pressed={quietMode}
      onClick={toggleQuietMode}
      className={`rounded-full border-white/10 font-bold uppercase tracking-widest text-[9px] md:text-[10px] transition-colors ${
        quietMode
          ? "bg-sky-400/15 text-sky-200 border-sky-300/30 hover:bg-sky-400/25"
          : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
      }`}
    >
      {quietMode ? (
        <EyeOff className="mr-2 h-4 w-4" />
      ) : (
        <Eye className="mr-2 h-4 w-4" />
      )}
      {quietMode ? "Quiet visuals on" : "Quiet visuals off"}
    </Button>
  );
};

export default QuietModeToggle;
