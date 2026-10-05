import type { SeasonalTime } from "../models/Club";

const maandNamen: Record<number, string> = {
  1: "jan",
  2: "feb",
  3: "mrt",
  4: "apr",
  5: "mei",
  6: "jun",
  7: "jul",
  8: "aug",
  9: "sep",
  10: "okt",
  11: "nov",
  12: "dec",
};

/**
 * Check whether a month falls within a from–to range,
 * correctly handling year-boundary wrapping (e.g. from: 9, to: 4 = Sep–Apr).
 */
export function isMonthInRange(
  month: number,
  from: number,
  to: number,
): boolean {
  if (from <= to) {
    return month >= from && month <= to;
  }
  return month >= from || month <= to;
}

/** Current month (1–12) in the Europe/Brussels timezone. */
export function currentMonth(): number {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Brussels" }),
  );
  return now.getMonth() + 1;
}

/** Month range label, e.g. "apr–aug". */
export function formatMonthRange(from: number, to: number): string {
  return `${maandNamen[from]}–${maandNamen[to]}`;
}

/** Whether a ride time applies in the given month (plain times always do). */
export function isInSeason(
  time: string | SeasonalTime[],
  month: number,
): boolean {
  if (typeof time === "string") return true;
  return time.some((t) => isMonthInRange(month, t.from, t.to));
}

/** Resolve the current time string for a given month. */
export function resolveTime(
  time: string | SeasonalTime[],
  month: number,
): string {
  if (typeof time === "string") return time;
  const entry = time.find((t) => isMonthInRange(month, t.from, t.to));
  return entry?.time ?? time[0]?.time ?? "—";
}

/** Build an explicit fallback label showing all seasonal times, e.g. "08:30 (mei–aug) / 09:00 (sep–apr)" */
export function formatSeasonalFallback(times: SeasonalTime[]): string {
  return times
    .map((t) => `${t.time} (${formatMonthRange(t.from, t.to)})`)
    .join(" / ");
}

/** Return a sort key for a time value (resolves seasonal to earliest time). */
export function timeSortKey(time: string | SeasonalTime[]): string {
  if (typeof time === "string") return time;
  return resolveTime(time, currentMonth());
}
