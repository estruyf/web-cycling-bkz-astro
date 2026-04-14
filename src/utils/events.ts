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

function getDaysInUtcMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

interface MonthlyRecurrencePattern {
  weekday: number;
  occurrenceInMonth: number;
  isLastWeekdayOfMonth: boolean;
}

function getMonthlyRecurrencePattern(date: Date): MonthlyRecurrencePattern {
  const dayOfMonth = date.getUTCDate();
  const daysInMonth = getDaysInUtcMonth(
    date.getUTCFullYear(),
    date.getUTCMonth(),
  );

  return {
    weekday: date.getUTCDay(),
    occurrenceInMonth: Math.ceil(dayOfMonth / 7),
    isLastWeekdayOfMonth: dayOfMonth + 7 > daysInMonth,
  };
}

function getLastWeekdayInUtcMonth(
  year: number,
  month: number,
  weekday: number,
): Date {
  const daysInMonth = getDaysInUtcMonth(year, month);
  const lastDayOfMonth = new Date(Date.UTC(year, month, daysInMonth));
  const delta = (lastDayOfMonth.getUTCDay() - weekday + 7) % 7;

  return new Date(Date.UTC(year, month, daysInMonth - delta));
}

function getNthWeekdayInUtcMonth(
  year: number,
  month: number,
  weekday: number,
  nth: number,
): Date {
  const firstDayOfMonth = new Date(Date.UTC(year, month, 1));
  const offset = (weekday - firstDayOfMonth.getUTCDay() + 7) % 7;
  const dayOfMonth = 1 + offset + (nth - 1) * 7;
  const daysInMonth = getDaysInUtcMonth(year, month);

  if (dayOfMonth > daysInMonth) {
    return getLastWeekdayInUtcMonth(year, month, weekday);
  }

  return new Date(Date.UTC(year, month, dayOfMonth));
}

function getMonthlyOccurrenceDate(
  startDate: Date,
  monthOffset: number,
  pattern: MonthlyRecurrencePattern,
): Date {
  const targetMonthBase = addUtcMonths(startDate, monthOffset);
  const year = targetMonthBase.getUTCFullYear();
  const month = targetMonthBase.getUTCMonth();

  if (pattern.isLastWeekdayOfMonth) {
    return getLastWeekdayInUtcMonth(year, month, pattern.weekday);
  }

  return getNthWeekdayInUtcMonth(
    year,
    month,
    pattern.weekday,
    pattern.occurrenceInMonth,
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

    if (frequency === "weekly") {
      let cursor = normalizedStart;
      let count = 0;

      while (cursor <= normalizedEnd && count < MAX_OCCURRENCES_PER_EVENT) {
        occurrences.push({
          event,
          occurrenceDate: cursor,
          key: `${event.id}-${cursor.toISOString()}`,
        });

        cursor = addUtcDays(cursor, 7);
        count += 1;
      }

      continue;
    }

    const pattern = getMonthlyRecurrencePattern(normalizedStart);
    let monthOffset = 0;
    let count = 0;

    while (count < MAX_OCCURRENCES_PER_EVENT) {
      const occurrenceDate = getMonthlyOccurrenceDate(
        normalizedStart,
        monthOffset,
        pattern,
      );

      if (occurrenceDate > normalizedEnd) {
        break;
      }

      occurrences.push({
        event,
        occurrenceDate,
        key: `${event.id}-${occurrenceDate.toISOString()}`,
      });

      monthOffset += 1;
      count += 1;
    }
  }

  return occurrences;
}
