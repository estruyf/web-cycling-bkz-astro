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
  gender: z.enum(["women", "men", "mixed"]).optional(),
});

const clubs = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    town: z.enum(["Beveren", "Kruibeke", "Zwijndrecht", "Melsele", "Vrasene"]),
    shortDescription: z.string().optional(),
    logo: z.string().optional(),
    website: z.string().optional(),
    meetingPoint: z.string().optional(),
    meetingPointDetail: z.string().optional(),
    contactEmail: z.string().optional(),
    active: z.boolean().default(true),
    claimable: z.boolean().default(false),
    gender: z.enum(["women", "men", "mixed"]).optional(),
    rides: z.array(rideSchema).optional(),
  }),
});

const sponsors = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    logo: z.string().optional(),
    website: z.string().optional(),
    tier: z.enum(["gold", "silver", "bronze"]),
    order: z.number().default(99),
    active: z.boolean().default(true),
  }),
});

const events = defineCollection({
  type: "content",
  schema: z
    .object({
      name: z.string(),
      frequency: z.enum(["once", "weekly", "monthly"]).default("once"),
      date: z.coerce.date().optional(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
      time: z.string().optional(),
      organizer: z.string(),
      town: z.string(),
      location: z.string(),
      website: z.string().optional(),
      contactEmail: z.string().optional(),
      active: z.boolean().default(true),
    })
    .superRefine((data, ctx) => {
      const hasSingleDate = !!data.date;
      const hasStartDate = !!data.startDate;
      const hasEndDate = !!data.endDate;

      if (!hasSingleDate && !hasStartDate && !hasEndDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Gebruik `date` of een combinatie van `startDate` en `endDate`.",
          path: ["date"],
        });
      }

      if ((hasStartDate && !hasEndDate) || (!hasStartDate && hasEndDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "`startDate` en `endDate` moeten samen ingevuld worden.",
          path: ["startDate"],
        });
      }

      if (hasStartDate && hasEndDate && data.startDate! > data.endDate!) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "`endDate` moet gelijk aan of later zijn dan `startDate`.",
          path: ["endDate"],
        });
      }
    }),
});

export const collections = { clubs, sponsors, events };
