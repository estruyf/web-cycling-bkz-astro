import { defineCollection, z } from "astro:content";

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
  time: z.string(),
  type: z.string(),
  notes: z.string().optional(),
  openForAll: z.boolean().default(true),
});

const clubs = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    town: z.enum(["Beveren", "Kruibeke", "Zwijndrecht", "Melsele"]),
    shortDescription: z.string(),
    logo: z.string().optional(),
    website: z.string().optional(),
    meetingPoint: z.string(),
    meetingPointDetail: z.string().optional(),
    contactEmail: z.string().optional(),
    active: z.boolean().default(true),
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

export const collections = { clubs, sponsors };
