import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useDestinations, visaTypeLabel } from "@/hooks/useDestinations";
import Logo from "@/components/Logo";
import BottomNav from "@/components/BottomNav";
import VisaBadge from "@/components/VisaBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark } from "lucide-react";

const SavedPage = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const { data: allDestinations, isLoading } = useDestinations();
  const navigate = useNavigate();

  const savedIds = profile?.saved_destinations ?? [];
  const savedDestinations = allDestinations?.filter((d) => savedIds.includes(d.id)) ?? [];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg px-5 pt-[env(safe-area-inset-top)] pb-2">
        <div className="mx-auto max-w-lg flex items-center justify-between py-3">
          <Logo />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5 mt-4">
        <h1 className="text-xl font-extrabold text-secondary mb-4">Saved Destinations</h1>

        {!user ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bookmark size={40} className="text-muted-foreground/40 mb-3" />
            <p className="text-sm font-semibold text-foreground mb-1">Sign up to save your guides</p>
            <p className="text-xs text-muted-foreground mb-4">
              Create an account to bookmark destinations and access them anytime
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 active:scale-95"
            >
              Sign Up
            </button>
          </div>
        ) : isLoading || authLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[72px] rounded-xl" />
            ))}
          </div>
        ) : savedDestinations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bookmark size={40} className="text-muted-foreground/40 mb-3" />
            <p className="text-sm font-semibold text-foreground mb-1">No saved destinations yet</p>
            <p className="text-xs text-muted-foreground">
              Tap the bookmark icon on any destination to save it here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {savedDestinations.map((d, i) => (
              <div
                key={d.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/destination/${d.id}`)}
                onKeyDown={(e) => e.key === "Enter" && navigate(`/destination/${d.id}`)}
                className="group flex items-start gap-3.5 rounded-xl bg-card p-4 shadow-sm border border-border/60 transition-all duration-200 active:scale-[0.98] hover:shadow-md cursor-pointer select-none animate-fade-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="text-3xl leading-none mt-0.5">{d.flag_emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm text-foreground truncate">{d.country_name}</h3>
                    <VisaBadge type={visaTypeLabel[d.visa_type] || d.visa_type} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{d.hero_tagline}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default SavedPage;
