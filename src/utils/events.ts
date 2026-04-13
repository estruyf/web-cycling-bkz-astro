import type { CollectionEntry } from "astro:content";

type EventEntry = CollectionEntry<"events">;

export interface EventOccurrence {
  event: EventEntry;
  occurrenceDate: Date;
  key: string;
}

const MAX_OCCURRENCES_PER_EVENT = 500;

function atUtcMidnight(inputDate: Date): Date {
  return new Date(
    Date.UTC(
      inputDate.getUTCFullYear(),
      inputDate.getUTCMonth(),
      inputDate.getUTCDate(),
    ),
  );
}

function addUtcDays(inputDate: Date, days: number): Date {
  const nextDate = new Date(inputDate);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

function addUtcMonths(inputDate: Date, months: number): Date {
  const year = inputDate.getUTCFullYear();
  const month = inputDate.getUTCMonth();
  const day = inputDate.getUTCDate();

  const targetMonth = month + months;
  const targetYear = year + Math.floor(targetMonth / 12);
  const normalizedMonth = ((targetMonth % 12) + 12) % 12;
  const lastDayOfTargetMonth = new Date(
    Date.UTC(targetYear, normalizedMonth + 1, 0),
  ).getUTCDate();

  return new Date(
    Date.UTC(targetYear, normalizedMonth, Math.min(day, lastDayOfTargetMonth)),
  );
}

export function expandEventsToOccurrences(
  events: EventEntry[],
): EventOccurrence[] {
  const occurrences: EventOccurrence[] = [];

  for (const event of events) {
    if (!event.data.active) continue;

    const startDate = event.data.startDate ?? event.data.date;
    const endDate =
      event.data.endDate ?? event.data.startDate ?? event.data.date;

    if (!startDate || !endDate) continue;

    const normalizedStart = atUtcMidnight(startDate);
    const normalizedEnd = atUtcMidnight(endDate);

    if (normalizedStart > normalizedEnd) continue;

    const frequency = event.data.frequency ?? "once";

    if (frequency === "once") {
      occurrences.push({
        event,
        occurrenceDate: normalizedStart,
        key: `${event.id}-${normalizedStart.toISOString()}`,
      });
      continue;
    }

    let cursor = normalizedStart;
    let count = 0;

    while (cursor <= normalizedEnd && count < MAX_OCCURRENCES_PER_EVENT) {
      occurrences.push({
        event,
        occurrenceDate: cursor,
        key: `${event.id}-${cursor.toISOString()}`,
      });

      cursor =
        frequency === "weekly"
          ? addUtcDays(cursor, 7)
          : addUtcMonths(cursor, 1);
      count += 1;
    }
  }

  return occurrences;
}
