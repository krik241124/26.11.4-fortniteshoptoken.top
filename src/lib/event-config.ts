/** Editorial event defaults, not a promise that chest eligibility lasts until this date. */
export const REVIEWED_DATE = '2026-11-04';
export const DEFAULT_PLANNING_TARGET = '2026-12-05';

const DAY_MS = 86400000;

/** Parse date-only values at UTC midnight, avoiding device-time-zone and DST shifts. */
export function parseCalendarDate(value: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1000 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const timestamp = Date.UTC(year, month - 1, day);
  const date = new Date(timestamp);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? timestamp
    : null;
}

export function calendarDayDifference(start: string, end: string): number | null {
  const startTimestamp = parseCalendarDate(start);
  const endTimestamp = parseCalendarDate(end);
  return startTimestamp === null || endTimestamp === null ? null : (endTimestamp - startTimestamp) / DAY_MS;
}

/** Use the visitor's local calendar date; never shift it through toISOString(). */
export function localCalendarDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function formatCalendarDate(value: string): string {
  const timestamp = parseCalendarDate(value);
  return timestamp === null ? value : new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
  }).format(timestamp);
}
