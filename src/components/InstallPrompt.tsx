import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!deferredPrompt || dismissed) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-lg animate-fade-up">
      <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-lg">
        <Download size={20} className="shrink-0 text-primary" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">Add Sorted to Home Screen</p>
          <p className="text-xs text-muted-foreground">Quick access to all your travel guides</p>
        </div>
        <button
          onClick={handleInstall}
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground min-h-[44px] min-w-[44px] active:scale-95"
        >
          Install
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-2 text-muted-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;
