export interface Ride {
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  time: string;
  type: string;
  notes?: string;
  openForAll: boolean;
}

export interface ClubData {
  name: string;
  town: "Beveren" | "Kruibeke" | "Zwijndrecht" | "Melsele";
  shortDescription: string;
  logo?: string;
  website?: string;
  meetingPoint: string;
  meetingPointDetail?: string;
  contactEmail?: string;
  active: boolean;
  womenOnly?: boolean;
  rides: Ride[];
}

export interface Club {
  id: string;
  body: string;
  data: ClubData;
}
