import type { SeasonalTime } from "./Club";

export interface WeekritOverzicht {
  clubNaam: string;
  clubSlug: string;
  dag: string;
  uur: string | SeasonalTime[];
  type: string;
  groep?: string;
  gemiddeldeSnelheid?: number | string;
  vertrekpunt: string;
  openVoorIedereen: boolean;
}
