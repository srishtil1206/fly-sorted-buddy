import type { VisaType } from "@/data/destinations";

const visaStyles: Record<VisaType, string> = {
  "Visa Free": "bg-visa-free/15 text-visa-free",
  "E-Visa": "bg-visa-evisa/15 text-visa-evisa",
  "Visa on Arrival": "bg-visa-arrival/15 text-visa-arrival",
  "Visa Required": "bg-visa-required/15 text-visa-required",
};

const VisaBadge = ({ type }: { type: VisaType }) => (
  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${visaStyles[type]}`}>
    {type}
  </span>
);

export default VisaBadge;
