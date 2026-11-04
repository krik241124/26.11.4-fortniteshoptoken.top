export const ACCESS_DURATION_HOURS = 14 * 24;
export const ACCESS_DURATION_MS = ACCESS_DURATION_HOURS * 60 * 60 * 1000;
export const ACTIVATION_DEADLINE_ISO = '2026-12-16T00:00:00.000Z';
export const ACTIVATION_DEADLINE_MS = Date.parse(ACTIVATION_DEADLINE_ISO);
export const PLANNER_REVIEWED_DATE = '2026-11-04';
export const FIRST_REPORTED_EVENT_DATE = '2026-11-01';

/** Strict UTC parsing prevents rollover dates and browser-local DST changes. */
export function parseUtcCalendarDate(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  if (!Number.isFinite(timestamp)) return null;
  return new Date(timestamp).toISOString().slice(0, 10) === value ? timestamp : null;
}

export function parseUtcDateTime(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  const timestamp = Date.parse(`${value}:00.000Z`);
  if (!Number.isFinite(timestamp)) return null;
  return new Date(timestamp).toISOString().slice(0, 16) === value ? timestamp : null;
}

export function utcDateTimeInput(date: Date): string {
  if (!Number.isFinite(date.getTime())) throw new RangeError('A valid date is required.');
  return date.toISOString().slice(0, 16);
}

export function formatUtcDateTime(timestamp: number): string {
  if (!Number.isFinite(timestamp) || !Number.isFinite(new Date(timestamp).getTime())) {
    throw new RangeError('A valid timestamp is required.');
  }
  const iso = new Date(timestamp).toISOString();
  return `${iso.slice(0, 10)} at ${iso.slice(11, 16)} UTC`;
}

export type AccessWindow = { start: number; end: number };

/** Adds exactly 336 hours, including when the dates cross a month or year. */
export function calculateAccessWindow(start: number): AccessWindow {
  const end = start + ACCESS_DURATION_MS;
  if (!Number.isSafeInteger(start) || !Number.isFinite(new Date(start).getTime()) || !Number.isFinite(new Date(end).getTime())) {
    throw new RangeError('A valid activation timestamp is required.');
  }
  return { start, end };
}

export function planActivation(foundDate: string, activationDateTime: string): {
  errors: { found?: string; activation?: string };
  window: AccessWindow | null;
} {
  const found = parseUtcCalendarDate(foundDate);
  const activation = parseUtcDateTime(activationDateTime);
  const errors: { found?: string; activation?: string } = {};
  if (found === null) errors.found = 'Enter a valid date for when you found the token (UTC).';
  else if (foundDate < FIRST_REPORTED_EVENT_DATE) errors.found = 'Choose a date on or after November 1, 2026, the reported event start date.';
  if (activation === null) {
    errors.activation = 'Enter a valid activation date and time in UTC.';
  } else if (found !== null && activation < found) {
    errors.activation = 'Activation cannot be earlier than the date you found the token.';
  } else if (activation >= ACTIVATION_DEADLINE_MS) {
    errors.activation = 'Choose a time before December 16, 2026 at 00:00 UTC, the reported 2026 deadline.';
  }
  if (Object.keys(errors).length > 0 || activation === null) return { errors, window: null };
  return { errors, window: calculateAccessWindow(activation) };
}
