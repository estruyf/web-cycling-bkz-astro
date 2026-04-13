import { defineCollection, z } from "astro:content";

const seasonalTimeSchema = z.object({
  from: z.number().int().min(1).max(12),
  to: z.number().int().min(1).max(12),
  time: z.string(),
});

const rideSchema = z.object({
  day: z.enum([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]),
  time: z.union([z.string(), z.array(seasonalTimeSchema).nonempty()]),
  type: z.string(),
  group: z.union([z.number(), z.string()]).optional(),
  averageSpeed: z.union([z.number(), z.string()]).optional(),
  notes: z.string().optional(),
  openForAll: z.boolean().default(true),
});

const clubs = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    town: z.enum(["Beveren", "Kruibeke", "Zwijndrecht", "Melsele", "Vrasene"]),
    shortDescription: z.string(),
    logo: z.string().optional(),
    website: z.string().optional(),
    meetingPoint: z.string(),
    meetingPointDetail: z.string().optional(),
    contactEmail: z.string().optional(),
    active: z.boolean().default(true),
    gender: z.enum(["women", "men", "mixed"]).optional(),
    rides: z.array(rideSchema),
  }),
});

const sponsors = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    website: z.string().optional(),
    tier: z.enum(["gold", "silver", "bronze"]),
    order: z.number().default(99),
    active: z.boolean().default(true),
  }),
});

const events = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    organizer: z.string(),
    location: z.string(),
    website: z.string().optional(),
    active: z.boolean().default(true),
  }),
});

export const collections = { clubs, sponsors, events };
