import type { SeasonalTime } from "./Club";

export interface WeekritOverzicht {
  clubNaam: string;
  clubSlug: string;
  gender?: "women" | "men" | "mixed";
  dag: string;
  uur: string | SeasonalTime[];
  type: string;
  groep?: string;
  gemiddeldeSnelheid?: number | string;
  vertrekpunt: string;
  openVoorIedereen: boolean;
}
