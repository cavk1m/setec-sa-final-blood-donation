import { QueueEntry, QueueStatus } from "../types/dashboard";


export const BLOOD_TYPE_STYLE: Record<
  string,
  { bg: string; color: string }
> = {
  'A+': { bg: '#dbeafe', color: '#1d4ed8' },
  'A-': { bg: '#bfdbfe', color: '#1d4ed8' },
  'B+': { bg: '#d1fae5', color: '#047857' },
  'B-': { bg: '#a7f3d0', color: '#047857' },
  'AB+': { bg: '#ede9fe', color: '#6d28d9' },
  'AB-': { bg: '#ddd6fe', color: '#6d28d9' },
  'O+': { bg: '#fee2e2', color: '#b91c1c' },
  'O-': { bg: '#fecaca', color: '#b91c1c' },
};

export function formatQueueTime(input: string | Date) {
  if (typeof input === "string") {
    const timeLike = input.match(/^\d{1,2}:\d{2}(\s?[AP]M)?$/i);
    if (timeLike) return input;
  }

  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return typeof input === "string" ? input : "";

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(d);
}

export function getSurveyColor(score: number) {
  // Treat any non-number as neutral (shouldn't happen with our mock data).
  if (!Number.isFinite(score)) return '#64748b';
  if (score >= 4) return '#16a34a';
  if (score >= 2) return '#f59e0b';
  return '#dc2626';
}

// Not used directly in the current queue UI, but handy for future work.
export function normalizeQueueStatus(status: string): QueueStatus {
  if (status === 'waiting') return 'waiting';
  if (status === 'in-progress') return 'in-progress';
  if (status === 'completed') return 'completed';
  if (status === 'skip') return 'skip';
  return 'waiting';
}

// Keep TS happy if some queue helpers expect this shape.
export function getQueueEntryId(entry: QueueEntry) {
  return entry.id;
}

