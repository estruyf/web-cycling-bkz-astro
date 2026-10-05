import type { Discipline } from "../utils/discipline";
import type { Town } from "../utils/towns";

export interface SeasonalTime {
  from: number;
  to: number;
  time: string;
}

export interface Ride {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  time: string | SeasonalTime[];
  type: string;
  discipline?: Discipline;
  group?: string | number;
  averageSpeed?: number | string;
  notes?: string | number;
  openForAll: boolean;
  gender?: "women" | "men" | "mixed";
}

export interface ClubData {
  name: string;
  town: Town;
  shortDescription?: string;
  logo?: string;
  website?: string;
  meetingPoint?: string;
  meetingPointDetail?: string;
  contactEmail?: string;
  active: boolean;
  claimable: boolean;
  gender?: "women" | "men" | "mixed";
  disciplines: Discipline[];
  rides?: Ride[];
}

export interface Club {
  id: string;
  body: string;
  data: ClubData;
}
