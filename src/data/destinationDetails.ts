import type { VisaType } from "./destinations";

export interface DestinationDetail {
  bestMonths: string;
  currency: string;
  visa: {
    type: VisaType;
    process: string[];
    documents: string[];
    processingTime: string;
    fees: string;
    rejectionReasons: string[];
    applyLink: string;
  };
  forex: {
    localCurrency: string;
    exchangeRate: string;
    bestCards: { name: string; pros: string; cons: string }[];
    exchangeComparison: { method: string; rate: string; fees: string; convenience: string }[];
    atmTips: string[];
    hiddenFees: string[];
    dailyBreakdown: { category: string; amount: string }[];
  };
  sim: {
    bestLocal: { name: string; price: string; data: string };
    esimOptions: { name: string; price: string; data: string }[];
    comparison: { option: string; price: string; data: string; speed: string }[];
    airportBuy: string;
    wifiNote: string;
  };
  transport: {
    airportToCity: { option: string; price: string; time: string }[];
    apps: string[];
    comparison: { mode: string; cost: string; bestFor: string }[];
    scamWarnings: string[];
  };
  stay: {
    neighborhoods: { name: string; vibe: string; priceRange: string }[];
    comparison: { type: string; priceRange: string; bestFor: string }[];
    platforms: string[];
    bookingTip: string;
  };
}

const defaultDetail: DestinationDetail = {
  bestMonths: "Nov – Mar",
  currency: "Thai Baht (THB)",
  visa: {
    type: "Visa on Arrival",
    process: [
      "Fill out the arrival form on the plane",
      "Queue at the 'Visa on Arrival' counter at the airport",
      "Submit documents and pay the fee",
      "Get your passport stamped — takes 15–30 min",
    ],
    documents: [
      "Passport valid for 6+ months",
      "2 passport-size photos",
      "Return flight ticket (within 15 days)",
      "Hotel booking confirmation",
      "Proof of funds — ₹15,000 cash or equivalent",
    ],
    processingTime: "15–30 minutes at the airport",
    fees: "₹1,700 (2,000 THB)",
    rejectionReasons: [
      "Passport validity less than 6 months",
      "No return ticket booked",
      "Insufficient funds for stay",
      "Criminal record flagged in immigration system",
    ],
    applyLink: "https://www.thaievisa.go.th/",
  },
  forex: {
    localCurrency: "Thai Baht (THB)",
    exchangeRate: "1 INR ≈ 0.44 THB",
    bestCards: [
      { name: "Niyo Global Card", pros: "Zero forex markup, free ATM withdrawals", cons: "Needs 2-day activation" },
      { name: "BookMyForex Card", pros: "Best exchange rates, lock rate feature", cons: "₹500 card fee" },
      { name: "Wise Multi-currency", pros: "Real mid-market rate, app-based", cons: "₹350 per ATM withdrawal" },
    ],
    exchangeComparison: [
      { method: "Airport Counter", rate: "Poor (5-8% markup)", fees: "None visible", convenience: "⭐⭐⭐⭐⭐" },
      { method: "City Money Changer", rate: "Good (1-2% markup)", fees: "None", convenience: "⭐⭐⭐" },
      { method: "Forex Card (Niyo)", rate: "Best (0% markup)", fees: "Free ATM", convenience: "⭐⭐⭐⭐" },
      { method: "Indian Debit Card", rate: "Bad (3.5% markup)", fees: "₹200–500/txn", convenience: "⭐⭐⭐⭐" },
    ],
    atmTips: [
      "Always choose 'without conversion' when the ATM asks",
      "Bangkok Bank & Kasikorn ATMs charge ₹180 per withdrawal",
      "Withdraw larger amounts to minimize per-transaction fees",
    ],
    hiddenFees: [
      "Dynamic Currency Conversion (DCC) — always decline",
      "Hotel currency exchange is 8-12% worse than market",
      "Some ATMs add ₹500+ 'access fee' — use Niyo to avoid",
    ],
    dailyBreakdown: [
      { category: "🏨 Accommodation", amount: "₹800" },
      { category: "🍜 Food (3 meals)", amount: "₹600" },
      { category: "🚌 Transport", amount: "₹300" },
      { category: "🎟️ Activities", amount: "₹500" },
      { category: "☕ Snacks & Drinks", amount: "₹300" },
    ],
  },
  sim: {
    bestLocal: { name: "TrueMove H Tourist SIM", price: "₹250 (299 THB)", data: "15GB for 8 days" },
    esimOptions: [
      { name: "Airalo Moshi Moshi", price: "₹350", data: "5GB / 7 days" },
      { name: "Nomad Thailand", price: "₹500", data: "10GB / 15 days" },
    ],
    comparison: [
      { option: "Local SIM (TrueMove)", price: "₹250", data: "15GB", speed: "4G/5G ⚡" },
      { option: "eSIM (Airalo)", price: "₹350", data: "5GB", speed: "4G" },
      { option: "Jio Intl Roaming", price: "₹575/day", data: "500MB/day", speed: "Varies 🐌" },
      { option: "Airtel Intl Pack", price: "₹649/day", data: "500MB/day", speed: "Varies 🐌" },
    ],
    airportBuy: "Available at arrivals hall — TrueMove, AIS, and DTAC counters. Open 24/7. Bring passport.",
    wifiNote: "Free WiFi available at most cafes, malls, and 7-Elevens. Speed is decent for messaging, not for video calls.",
  },
  transport: {
    airportToCity: [
      { option: "Airport Rail Link (ARL)", price: "₹30–₹50", time: "30 min" },
      { option: "Grab (ride-hailing)", price: "₹350–₹500", time: "45–90 min" },
      { option: "Airport Taxi (metered)", price: "₹250–₹400", time: "45–90 min" },
      { option: "Airport Bus (S1)", price: "₹50", time: "60 min" },
    ],
    apps: ["Grab (like Uber)", "Google Maps (transit)", "BTS Rabbit Wallet", "Moovit"],
    comparison: [
      { mode: "BTS/MRT (Metro)", cost: "₹15–₹50/trip", bestFor: "City center travel" },
      { mode: "Grab Bike", cost: "₹50–₹100", bestFor: "Short distances, traffic jams" },
      { mode: "Grab Car", cost: "₹150–₹400", bestFor: "Comfort, groups, luggage" },
      { mode: "Day Pass (BTS)", cost: "₹120/day", bestFor: "Sightseeing heavy days" },
    ],
    scamWarnings: [
      "🚨 Tuk-tuk drivers offering 'free tours' will take you to gem shops for commission",
      "🚨 Always insist on the taxi meter — refuse flat rates from airport",
      "🚨 Jet ski scam in Phuket — they'll claim you damaged it and demand ₹50,000+",
      "🚨 'Temple is closed today' scam — it's not, they want to reroute you to shops",
    ],
  },
  stay: {
    neighborhoods: [
      { name: "Khao San Road", vibe: "Backpacker party hub", priceRange: "₹400–₹1,200/night" },
      { name: "Silom", vibe: "Business district, nightlife", priceRange: "₹1,500–₹3,000/night" },
      { name: "Sukhumvit (Soi 11)", vibe: "Modern, food scene", priceRange: "₹1,000–₹2,500/night" },
      { name: "Old Town (Rattanakosin)", vibe: "Temples, history", priceRange: "₹600–₹1,500/night" },
    ],
    comparison: [
      { type: "Hostel Dorm", priceRange: "₹400–₹800", bestFor: "Solo travelers, social vibe" },
      { type: "Airbnb Studio", priceRange: "₹1,200–₹2,500", bestFor: "Couples, privacy" },
      { type: "Budget Hotel", priceRange: "₹1,500–₹3,000", bestFor: "Families, comfort" },
      { type: "Luxury Hotel", priceRange: "₹5,000–₹15,000", bestFor: "Honeymoons, splurge" },
    ],
    platforms: ["Hostelworld — best for dorms", "Agoda — best Asia rates", "Booking.com — free cancellation", "Airbnb — apartments & villas"],
    bookingTip: "Book 3–4 weeks ahead for best prices. Avoid booking during Songkran (April 13-15) unless you plan for it — prices 2x.",
  },
};

// Generate detail data per destination (using defaults with overrides)
const detailOverrides: Record<string, Partial<Pick<DestinationDetail, "bestMonths" | "currency">>> = {
  thailand: { bestMonths: "Nov – Mar", currency: "Thai Baht (THB)" },
  indonesia: { bestMonths: "Apr – Oct", currency: "Indonesian Rupiah (IDR)" },
  vietnam: { bestMonths: "Feb – Apr", currency: "Vietnamese Dong (VND)" },
  "sri-lanka": { bestMonths: "Dec – Mar", currency: "Sri Lankan Rupee (LKR)" },
  singapore: { bestMonths: "Year-round", currency: "Singapore Dollar (SGD)" },
  malaysia: { bestMonths: "Mar – Oct", currency: "Malaysian Ringgit (MYR)" },
  uae: { bestMonths: "Nov – Mar", currency: "UAE Dirham (AED)" },
  nepal: { bestMonths: "Oct – Dec", currency: "Nepalese Rupee (NPR)" },
  maldives: { bestMonths: "Nov – Apr", currency: "Maldivian Rufiyaa (MVR)" },
  japan: { bestMonths: "Mar – May", currency: "Japanese Yen (JPY)" },
  france: { bestMonths: "Apr – Jun", currency: "Euro (EUR)" },
  uk: { bestMonths: "May – Sep", currency: "British Pound (GBP)" },
  switzerland: { bestMonths: "Jun – Sep", currency: "Swiss Franc (CHF)" },
  italy: { bestMonths: "Apr – Jun", currency: "Euro (EUR)" },
  germany: { bestMonths: "May – Sep", currency: "Euro (EUR)" },
  turkey: { bestMonths: "Apr – Jun", currency: "Turkish Lira (TRY)" },
  australia: { bestMonths: "Sep – Nov", currency: "Australian Dollar (AUD)" },
  usa: { bestMonths: "Apr – Jun", currency: "US Dollar (USD)" },
  canada: { bestMonths: "Jun – Sep", currency: "Canadian Dollar (CAD)" },
  georgia: { bestMonths: "May – Oct", currency: "Georgian Lari (GEL)" },
};

export function getDestinationDetail(id: string): DestinationDetail {
  const overrides = detailOverrides[id] || {};
  return { ...defaultDetail, ...overrides };
}
