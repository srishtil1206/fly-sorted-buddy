import { useState, useMemo } from "react";
import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import DestinationCard from "@/components/DestinationCard";
import BottomNav from "@/components/BottomNav";
import { destinations } from "@/data/destinations";

const Index = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return destinations;
    return destinations.filter(
      (d) =>
        d.country.toLowerCase().includes(q) ||
        d.visaType.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg px-5 pt-[env(safe-area-inset-top)] pb-2">
        <div className="mx-auto max-w-lg flex items-center justify-between py-3">
          <Logo />
          <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            🇮🇳 India
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-5">
        {/* Hero */}
        <section className="mt-2 mb-6 animate-fade-up">
          <h1 className="text-[1.7rem] leading-tight font-extrabold text-secondary">
            Your first international trip,{" "}
            <span className="text-primary">sorted.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Visa, forex, SIM, transport — everything you need before you fly.
          </p>
        </section>

        {/* Search */}
        <div className="mb-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Destinations */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">
              Popular Destinations
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              {filtered.length} countries
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {filtered.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">
                No destinations found. Try a different search.
              </p>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
