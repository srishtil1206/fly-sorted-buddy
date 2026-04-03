import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Bookmark, Share2, Check, ExternalLink, Lock, Sparkles, Calendar, Wallet, Globe } from "lucide-react";
import { useDestination, visaTypeLabel } from "@/hooks/useDestinations";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import VisaBadge from "@/components/VisaBadge";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SectionLabel = ({ label, premium }: { label: string; premium?: boolean }) => (
  <span
    className={`ml-auto mr-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
      premium ? "bg-primary/15 text-primary" : "bg-visa-free/15 text-visa-free"
    }`}
  >
    {premium ? (
      <span className="flex items-center gap-1">
        <Lock size={10} /> Premium
      </span>
    ) : (
      "Free"
    )}
  </span>
);

const TableRow = ({ cells, header }: { cells: string[]; header?: boolean }) => (
  <div
    className={`grid gap-1 border-b border-border/50 px-3 py-2 text-xs last:border-0 ${
      header ? "font-semibold text-foreground bg-muted/50" : "text-muted-foreground"
    }`}
    style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
  >
    {cells.map((c, i) => (
      <span key={i} className={i === 0 ? "font-medium text-foreground" : ""}>
        {c}
      </span>
    ))}
  </div>
);

const ChecklistItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-2 py-1">
    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-visa-free/15">
      <Check size={10} className="text-visa-free" />
    </div>
    <span className="text-xs text-muted-foreground">{text}</span>
  </div>
);

const StepItem = ({ step, index }: { step: string; index: number }) => (
  <div className="flex items-start gap-3 py-1.5">
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
      {index + 1}
    </div>
    <span className="text-xs text-muted-foreground leading-relaxed">{step}</span>
  </div>
);

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-muted/60 p-3">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="mt-0.5 text-sm font-bold text-foreground">{value}</p>
  </div>
);

const PremiumBlur = ({ children, isPremium }: { children: React.ReactNode; isPremium?: boolean }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");

  if (isPremium) return <>{children}</>;

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("We'll notify you when Premium launches!");
    setShowModal(false);
    setNotifyEmail("");
  };

  return (
    <>
      <div className="relative">
        <div className="max-h-[120px] overflow-hidden">
          {children}
        </div>
        <div className="absolute inset-0 top-8 flex flex-col items-center justify-end bg-gradient-to-t from-background via-background/95 to-transparent pb-4 pt-12">
          <p className="text-[10px] text-muted-foreground mb-2 text-center max-w-[250px]">
            Unlock transport guides, accommodation tips, and offline access for all 20 destinations
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform active:scale-95"
          >
            <Sparkles size={14} />
            Get Sorted Premium — ₹299/year
          </button>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="mx-auto max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-extrabold text-secondary">
              Coming Soon! 🚀
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-muted-foreground">
            Premium is launching soon. We'll notify you when it's ready.
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
    </>
  );
};

// Safe accessors for JSONB content
const arr = (val: unknown): any[] => (Array.isArray(val) ? val : []);
const str = (val: unknown, fallback = ""): string => (typeof val === "string" ? val : fallback);
const obj = (val: unknown): Record<string, any> => (val && typeof val === "object" && !Array.isArray(val) ? val as Record<string, any> : {});

const DestinationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();
  const { data: dest, isLoading } = useDestination(id);

  const isSaved = profile?.saved_destinations?.includes(id || "") ?? false;
  const isPremium = profile?.is_premium ?? false;

  const handleSave = async () => {
    if (!user) {
      toast("Sign up to save your guides", {
        action: { label: "Sign Up", onClick: () => navigate("/profile") },
      });
      return;
    }
    if (!id || !profile) return;

    const current = profile.saved_destinations ?? [];
    const updated = isSaved
      ? current.filter((did) => did !== id)
      : [...current, id];

    const { error } = await supabase
      .from("profiles")
      .update({ saved_destinations: updated })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save");
      return;
    }
    await refreshProfile();
    toast.success(isSaved ? "Removed from saved" : "Saved!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-5 space-y-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Destination not found.</p>
      </div>
    );
  }

  const visa = obj(dest.visa_content);
  const forex = obj(dest.forex_content);
  const sim = obj(dest.sim_content);
  const transport = obj(dest.transport_content);
  const stay = obj(dest.accommodation_content);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${dest.country_name} — Sorted`, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors active:text-foreground">
            <ArrowLeft size={18} />
          </button>
          <Logo />
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className={`rounded-full p-2 transition-all active:scale-90 ${isSaved ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button onClick={handleShare} className="rounded-full bg-muted p-2 text-muted-foreground transition-all active:scale-90">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary px-5 py-8">
        <div className="mx-auto max-w-lg relative z-10">
          <span className="text-5xl">{dest.flag_emoji}</span>
          <h1 className="mt-3 text-2xl font-extrabold text-primary-foreground leading-tight">
            {dest.country_name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <VisaBadge type={visaTypeLabel[dest.visa_type] || dest.visa_type} />
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              <Wallet size={12} /> ₹{dest.avg_daily_budget_inr.toLocaleString("en-IN")}/day
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              <Calendar size={12} /> {dest.best_months}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              <Globe size={12} /> {dest.currency_name}
            </span>
          </div>
        </div>
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-20 -left-12 h-40 w-40 rounded-full bg-primary-foreground/5" />
      </section>

      {/* Content */}
      <main className="mx-auto max-w-lg px-4 mt-4">
        <Accordion type="single" defaultValue="visa" collapsible className="space-y-3">
          {/* VISA */}
          <AccordionItem value="visa" className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <AccordionTrigger className="px-4 py-3.5 text-sm font-bold hover:no-underline">
              <span className="flex items-center gap-2">🛂 Visa & Entry</span>
              <SectionLabel label="Free" />
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <InfoCard label="Visa Type" value={str(visa.type, visaTypeLabel[dest.visa_type])} />
                <InfoCard label="Processing" value={str(visa.processing_time, "—")} />
                <InfoCard label="Fees" value={str(visa.fee_inr, "—")} />
                <InfoCard label="Apply" value="Online ↗" />
              </div>

              {arr(visa.steps).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Step-by-Step Process</h4>
                  <div className="mb-4">
                    {arr(visa.steps).map((s: string, i: number) => (
                      <StepItem key={i} step={s} index={i} />
                    ))}
                  </div>
                </>
              )}

              {arr(visa.documents).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Required Documents</h4>
                  <div className="mb-4">
                    {arr(visa.documents).map((d: string, i: number) => (
                      <ChecklistItem key={i} text={d} />
                    ))}
                  </div>
                </>
              )}

              {arr(visa.rejection_reasons).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Common Rejection Reasons</h4>
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 mb-3">
                    {arr(visa.rejection_reasons).map((r: string, i: number) => (
                      <p key={i} className="text-xs text-destructive py-0.5">⚠️ {r}</p>
                    ))}
                  </div>
                </>
              )}

              {visa.apply_link && (
                <a
                  href={str(visa.apply_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition-transform active:scale-95"
                >
                  <ExternalLink size={14} /> Apply for Visa
                </a>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* FOREX */}
          <AccordionItem value="forex" className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <AccordionTrigger className="px-4 py-3.5 text-sm font-bold hover:no-underline">
              <span className="flex items-center gap-2">💱 Currency & Forex</span>
              <SectionLabel label="Free" />
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid grid-cols-2 gap-2 mb-4">
                <InfoCard label="Currency" value={str(forex.local_currency, dest.currency_name)} />
                <InfoCard label="Rate" value={str(forex.exchange_rate, "—")} />
              </div>

              {arr(forex.best_cards).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Best Forex Cards for Indians</h4>
                  <div className="space-y-2 mb-4">
                    {arr(forex.best_cards).map((card: any, i: number) => (
                      <div key={i} className="rounded-lg border border-border/60 p-3">
                        <p className="text-xs font-bold text-foreground">{card.name}</p>
                        <p className="text-[11px] text-visa-free mt-0.5">✅ {card.pros}</p>
                        <p className="text-[11px] text-destructive mt-0.5">⛔ {card.cons}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {arr(forex.exchange_comparison).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Exchange Method Comparison</h4>
                  <div className="rounded-lg border border-border/60 overflow-hidden mb-4">
                    <TableRow header cells={["Method", "Rate", "Fees", "Ease"]} />
                    {arr(forex.exchange_comparison).map((row: any, i: number) => (
                      <TableRow key={i} cells={[row.method, row.rate, row.fees, row.convenience]} />
                    ))}
                  </div>
                </>
              )}

              {arr(forex.daily_breakdown).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Daily Budget Breakdown</h4>
                  <div className="rounded-lg border border-border/60 overflow-hidden mb-4">
                    {arr(forex.daily_breakdown).map((item: any, i: number) => (
                      <div key={i} className="flex items-center justify-between border-b border-border/50 last:border-0 px-3 py-2">
                        <span className="text-xs text-foreground">{item.category}</span>
                        <span className="text-xs font-bold text-foreground">{item.amount}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between bg-muted/50 px-3 py-2">
                      <span className="text-xs font-bold text-foreground">Total</span>
                      <span className="text-xs font-bold text-primary">
                        ₹{arr(forex.daily_breakdown).reduce((sum: number, item: any) => sum + parseInt(String(item.amount).replace(/[₹,]/g, "") || "0"), 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {arr(forex.hidden_fees).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">⚠️ Hidden Fee Warnings</h4>
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                    {arr(forex.hidden_fees).map((f: string, i: number) => (
                      <p key={i} className="text-xs text-destructive py-0.5">🚩 {f}</p>
                    ))}
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* SIM */}
          <AccordionItem value="sim" className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <AccordionTrigger className="px-4 py-3.5 text-sm font-bold hover:no-underline">
              <span className="flex items-center gap-2">📱 SIM & Internet</span>
              <SectionLabel label="Free" />
            </AccordionTrigger>
            <AccordionContent className="px-4">
              {obj(sim.best_local).name && (
                <div className="rounded-lg border-2 border-primary/30 bg-accent p-3 mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">Best Pick</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{obj(sim.best_local).name}</p>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{obj(sim.best_local).price}</span>
                    <span className="text-xs text-muted-foreground">{obj(sim.best_local).data}</span>
                  </div>
                </div>
              )}

              {arr(sim.esim_options).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">eSIM Options</h4>
                  <div className="space-y-2 mb-4">
                    {arr(sim.esim_options).map((e: any, i: number) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2.5">
                        <span className="text-xs font-semibold text-foreground">{e.name}</span>
                        <span className="text-xs text-muted-foreground">{e.price} · {e.data}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {arr(sim.comparison).length > 0 && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Full Comparison</h4>
                  <div className="rounded-lg border border-border/60 overflow-hidden mb-4">
                    <TableRow header cells={["Option", "Price", "Data", "Speed"]} />
                    {arr(sim.comparison).map((row: any, i: number) => (
                      <TableRow key={i} cells={[row.option, row.price, row.data, row.speed]} />
                    ))}
                  </div>
                </>
              )}

              {sim.airport_buy && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-2">Where to Buy at Airport</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{str(sim.airport_buy)}</p>
                </>
              )}

              {sim.wifi_note && (
                <>
                  <h4 className="text-xs font-bold text-foreground mb-1">WiFi Availability</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{str(sim.wifi_note)}</p>
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* TRANSPORT — PREMIUM */}
          <AccordionItem value="transport" className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <AccordionTrigger className="px-4 py-3.5 text-sm font-bold hover:no-underline">
              <span className="flex items-center gap-2">🚌 Getting Around</span>
              <SectionLabel label="Premium" premium />
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <PremiumBlur>
                {arr(transport.airport_to_city).length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-2">Airport to City</h4>
                    <div className="rounded-lg border border-border/60 overflow-hidden mb-4">
                      <TableRow header cells={["Option", "Price", "Time"]} />
                      {arr(transport.airport_to_city).map((row: any, i: number) => (
                        <TableRow key={i} cells={[row.option, row.price, row.time]} />
                      ))}
                    </div>
                  </>
                )}

                {arr(transport.apps).length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-2">Apps to Download</h4>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {arr(transport.apps).map((app: string, i: number) => (
                        <span key={i} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-foreground">{app}</span>
                      ))}
                    </div>
                  </>
                )}

                {arr(transport.comparison).length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-2">Transport Comparison</h4>
                    <div className="rounded-lg border border-border/60 overflow-hidden mb-4">
                      <TableRow header cells={["Mode", "Cost", "Best For"]} />
                      {arr(transport.comparison).map((row: any, i: number) => (
                        <TableRow key={i} cells={[row.mode, row.cost, row.best_for]} />
                      ))}
                    </div>
                  </>
                )}

                {arr(transport.scam_warnings).length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-2">⚠️ Scam Warnings</h4>
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                      {arr(transport.scam_warnings).map((w: string, i: number) => (
                        <p key={i} className="text-xs text-destructive py-0.5">{w}</p>
                      ))}
                    </div>
                  </>
                )}
              </PremiumBlur>
            </AccordionContent>
          </AccordionItem>

          {/* STAY — PREMIUM */}
          <AccordionItem value="stay" className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-sm">
            <AccordionTrigger className="px-4 py-3.5 text-sm font-bold hover:no-underline">
              <span className="flex items-center gap-2">🏠 Where to Stay</span>
              <SectionLabel label="Premium" premium />
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <PremiumBlur>
                {arr(stay.neighborhoods).length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-2">Best Neighborhoods</h4>
                    <div className="space-y-2 mb-4">
                      {arr(stay.neighborhoods).map((n: any, i: number) => (
                        <div key={i} className="rounded-lg border border-border/60 p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-foreground">{n.name}</p>
                            <span className="text-[11px] font-semibold text-primary">{n.price_range}</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{n.vibe}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {arr(stay.comparison).length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-2">Accommodation Comparison</h4>
                    <div className="rounded-lg border border-border/60 overflow-hidden mb-4">
                      <TableRow header cells={["Type", "Price/Night", "Best For"]} />
                      {arr(stay.comparison).map((row: any, i: number) => (
                        <TableRow key={i} cells={[row.type, row.price_range, row.best_for]} />
                      ))}
                    </div>
                  </>
                )}

                {arr(stay.platforms).length > 0 && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-2">Booking Platforms</h4>
                    <div className="mb-4">
                      {arr(stay.platforms).map((p: string, i: number) => (
                        <ChecklistItem key={i} text={p} />
                      ))}
                    </div>
                  </>
                )}

                {stay.booking_tip && (
                  <>
                    <h4 className="text-xs font-bold text-foreground mb-1">💡 Pro Tip</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{str(stay.booking_tip)}</p>
                  </>
                )}
              </PremiumBlur>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
};

export default DestinationDetail;
