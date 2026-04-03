import { Lock, Sparkles } from "lucide-react";

const PremiumOverlay = () => (
  <div className="relative">
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-end rounded-b-lg bg-gradient-to-t from-background via-background/95 to-transparent pb-4">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
          <Lock size={14} />
          <span>Premium Content</span>
        </div>
        <button className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95">
          <Sparkles size={14} />
          Unlock with Sorted Premium — ₹299/year
        </button>
      </div>
    </div>
  </div>
);

export default PremiumOverlay;
