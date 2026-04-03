import { useNavigate } from "react-router-dom";
import type { Destination } from "@/data/destinations";
import VisaBadge from "./VisaBadge";

const DestinationCard = ({ destination, index }: { destination: Destination; index: number }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/destination/${destination.id}`)}
      className="group flex items-start gap-3.5 rounded-xl bg-card p-4 shadow-sm border border-border/60 transition-all duration-200 active:scale-[0.98] hover:shadow-md hover:-translate-y-0.5 animate-fade-up cursor-pointer"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className="text-3xl leading-none mt-0.5">{destination.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-sm text-foreground truncate">{destination.country}</h3>
          <VisaBadge type={destination.visaType} />
        </div>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{destination.hook}</p>
      </div>
    </div>
  );
};

export default DestinationCard;
