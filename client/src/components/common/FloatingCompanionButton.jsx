import { Sparkles } from "lucide-react";

function FloatingCompanionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-gold py-3.5 pl-4 pr-5 text-ink shadow-gold transition-all duration-300 hover:scale-105 hover:pr-6 sm:bottom-8 sm:right-8"
      aria-label="Open Travel Companion"
    >
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ink/10">
        <Sparkles size={15} />
      </span>
      <span className="whitespace-nowrap text-sm font-semibold uppercase tracking-wide">
        Travel Companion
      </span>
    </button>
  );
}

export default FloatingCompanionButton;
