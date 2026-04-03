import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Destination = Tables<"destinations">;

export type VisaType = "visa_free" | "e_visa" | "visa_on_arrival" | "visa_required";

export const visaTypeLabel: Record<string, string> = {
  visa_free: "Visa Free",
  e_visa: "E-Visa",
  visa_on_arrival: "Visa on Arrival",
  visa_required: "Visa Required",
};

export function useDestinations() {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Destination[];
    },
  });
}

export function useDestination(id: string | undefined) {
  return useQuery({
    queryKey: ["destination", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID");
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data as Destination | null;
    },
    enabled: !!id,
  });
}
