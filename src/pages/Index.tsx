import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";
import VisaBadge from "@/components/VisaBadge";
import { useDestinations, visaTypeLabel } from "@/hooks/useDestinations";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: destinations, isLoading } = useDestinations();

  const filtered = useMemo(() => {
    if (!destinations) return [];
    const q = search.toLowerCase().trim();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.country_name.toLowerCase().includes(q) ||
        visaTypeLabel[d.visa_type]?.toLowerCase().includes(q)
    );
  }, [search, destinations]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg px-5 pt-[env(safe-area-inset-top)] pb-2">
        <div className="mx-auto max-w-lg flex items-center justify-between py-3">
          <Logo />
          <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            🇮🇳 India
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5">
        <section className="mt-2 mb-6 animate-fade-up">
          <h1 className="text-[1.7rem] leading-tight font-extrabold text-secondary">
            Your first international trip,{" "}
            <span className="text-primary">sorted.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Visa, forex, SIM, transport — everything you need before you fly.
          </p>
        </section>

        <div className="mb-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">Popular Destinations</h2>
            <span className="text-xs text-muted-foreground font-medium">
              {isLoading ? "..." : `${filtered.length} countries`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-card p-4 border border-border/60">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Skeleton className="h-10 w-10 rounded-lg" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                ))
              : filtered.map((d, i) => {
                  const tagline = (d.hero_tagline || "")
                    .replace(/·?\s*₹[\d,]+\/day\s*budget/gi, "")
                    .replace(/·\s*$/, "")
                    .trim();
                  return (
                    <div
                      key={d.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`/destination/${d.id}`)}
                      onKeyDown={(e) => e.key === "Enter" && navigate(`/destination/${d.id}`)}
                      className="group flex flex-col items-center text-center gap-2 rounded-xl bg-card p-5 shadow-sm border border-border/60 transition-all duration-200 active:scale-[0.98] hover:shadow-md hover:-translate-y-0.5 animate-fade-up cursor-pointer select-none"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <span className="text-4xl leading-none">{d.flag_emoji}</span>
                      <h3 className="font-semibold text-sm text-foreground truncate w-full">
                        {d.country_name}
                      </h3>
                      <VisaBadge type={visaTypeLabel[d.visa_type] || d.visa_type} />
                      {tagline && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {tagline}
                        </p>
                      )}
                    </div>
                  );
                })}
            {!isLoading && filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No destinations found. Try a different search.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <InstallPrompt />
      <BottomNav />
    </div>
  );
};

export default Index;
