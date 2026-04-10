export interface WeekritOverzicht {
  clubNaam: string;
  clubSlug: string;
  dag: string;
  uur: string;
  type: string;
  groep?: string;
  gemiddeldeSnelheid?: number;
  vertrekpunt: string;
  openVoorIedereen: boolean;
}
