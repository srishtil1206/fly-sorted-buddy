export type VisaType = "Visa Free" | "E-Visa" | "Visa on Arrival" | "Visa Required";

export interface Destination {
  id: string;
  country: string;
  flag: string;
  hook: string;
  visaType: VisaType;
  budgetPerDay: string;
}

export const destinations: Destination[] = [
  { id: "thailand", country: "Thailand", flag: "🇹🇭", hook: "Visa on arrival · ₹2,500/day budget", visaType: "Visa on Arrival", budgetPerDay: "₹2,500" },
  { id: "indonesia", country: "Indonesia (Bali)", flag: "🇮🇩", hook: "Visa on arrival · ₹2,000/day budget", visaType: "Visa on Arrival", budgetPerDay: "₹2,000" },
  { id: "vietnam", country: "Vietnam", flag: "🇻🇳", hook: "E-Visa available · ₹1,800/day budget", visaType: "E-Visa", budgetPerDay: "₹1,800" },
  { id: "sri-lanka", country: "Sri Lanka", flag: "🇱🇰", hook: "E-Visa available · ₹2,200/day budget", visaType: "E-Visa", budgetPerDay: "₹2,200" },
  { id: "singapore", country: "Singapore", flag: "🇸🇬", hook: "Visa required · ₹5,000/day budget", visaType: "Visa Required", budgetPerDay: "₹5,000" },
  { id: "malaysia", country: "Malaysia", flag: "🇲🇾", hook: "E-Visa available · ₹2,800/day budget", visaType: "E-Visa", budgetPerDay: "₹2,800" },
  { id: "uae", country: "UAE (Dubai)", flag: "🇦🇪", hook: "Visa on arrival · ₹6,000/day budget", visaType: "Visa on Arrival", budgetPerDay: "₹6,000" },
  { id: "nepal", country: "Nepal", flag: "🇳🇵", hook: "Visa free · ₹1,500/day budget", visaType: "Visa Free", budgetPerDay: "₹1,500" },
  { id: "maldives", country: "Maldives", flag: "🇲🇻", hook: "Visa on arrival · ₹8,000/day budget", visaType: "Visa on Arrival", budgetPerDay: "₹8,000" },
  { id: "japan", country: "Japan", flag: "🇯🇵", hook: "E-Visa available · ₹7,000/day budget", visaType: "E-Visa", budgetPerDay: "₹7,000" },
  { id: "france", country: "France", flag: "🇫🇷", hook: "Schengen visa · ₹8,500/day budget", visaType: "Visa Required", budgetPerDay: "₹8,500" },
  { id: "uk", country: "United Kingdom", flag: "🇬🇧", hook: "Visa required · ₹9,000/day budget", visaType: "Visa Required", budgetPerDay: "₹9,000" },
  { id: "switzerland", country: "Switzerland", flag: "🇨🇭", hook: "Schengen visa · ₹12,000/day budget", visaType: "Visa Required", budgetPerDay: "₹12,000" },
  { id: "italy", country: "Italy", flag: "🇮🇹", hook: "Schengen visa · ₹7,500/day budget", visaType: "Visa Required", budgetPerDay: "₹7,500" },
  { id: "germany", country: "Germany", flag: "🇩🇪", hook: "Schengen visa · ₹8,000/day budget", visaType: "Visa Required", budgetPerDay: "₹8,000" },
  { id: "turkey", country: "Turkey", flag: "🇹🇷", hook: "E-Visa available · ₹3,500/day budget", visaType: "E-Visa", budgetPerDay: "₹3,500" },
  { id: "australia", country: "Australia", flag: "🇦🇺", hook: "Visa required · ₹10,000/day budget", visaType: "Visa Required", budgetPerDay: "₹10,000" },
  { id: "usa", country: "USA", flag: "🇺🇸", hook: "Visa required · ₹10,000/day budget", visaType: "Visa Required", budgetPerDay: "₹10,000" },
  { id: "canada", country: "Canada", flag: "🇨🇦", hook: "Visa required · ₹9,500/day budget", visaType: "Visa Required", budgetPerDay: "₹9,500" },
  { id: "georgia", country: "Georgia", flag: "🇬🇪", hook: "E-Visa available · ₹3,000/day budget", visaType: "E-Visa", budgetPerDay: "₹3,000" },
];
