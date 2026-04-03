import { useState } from "react";
import { Sparkles, Crown, Check, X } from "lucide-react";
import Logo from "@/components/Logo";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const features = [
  "🚌 Transport guides for all 20 destinations",
  "🏠 Accommodation tips & neighborhood guides",
  "📥 Offline access to all guides",
  "🔄 Lifetime updates as content grows",
];

const PremiumPage = () => {
  const { profile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("We'll notify you when Premium launches!");
    setShowModal(false);
    setNotifyEmail("");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg px-5 pt-[env(safe-area-inset-top)] pb-2">
        <div className="mx-auto max-w-lg flex items-center justify-center py-3">
          <Logo />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 mt-6">
        {profile?.is_premium ? (
          <div className="text-center py-12">
            <Crown size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold text-secondary">You're Premium! 🎉</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You have full access to all destination guides.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <Sparkles size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl font-extrabold text-secondary">
                Get Sorted <span className="text-primary">Premium</span>
              </h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Unlock transport guides, accommodation tips, and offline access for all 20 destinations
              </p>
            </div>

            {/* Price Card */}
            <div className="rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-6 shadow-xl mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-primary-foreground">₹299</span>
                <span className="text-sm font-medium text-primary-foreground/70">/year</span>
              </div>
              <p className="mt-1 text-xs text-primary-foreground/70">Less than ₹1/day</p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-card border border-border/60 p-3.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-visa-free/15">
                    <Check size={12} className="text-visa-free" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
            >
              Get Premium — ₹299/year
            </button>
          </>
        )}
      </main>

      {/* Coming Soon Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="mx-auto max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-extrabold text-secondary">
              Coming Soon! 🚀
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-muted-foreground">
            Premium is launching soon. Enter your email and we'll notify you when it's ready.
          </p>
          <form onSubmit={handleNotify} className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="your@email.com"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-border/60 bg-card py-3 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 active:scale-[0.98]"
            >
              Notify Me
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default PremiumPage;
