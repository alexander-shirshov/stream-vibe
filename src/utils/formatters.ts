import { type Locale } from '@/i18n/types';

type DurationLabels = {
  hours: string;
  minutes: string;
};

export function formatDuration(minutes: number, labels: DurationLabels): string {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  if (hours && restMinutes) return `${hours}${labels.hours} ${restMinutes}${labels.minutes}`;
  if (hours) return `${hours}${labels.hours}`;
  return `${restMinutes}${labels.minutes}`;
}

export function formatViews(value: number): string {
  if (value >= 1_000_000) return `${Math.floor(value / 1_000_000)}M`;
  if (value >= 1_000) return `${Math.floor(value / 1_000)}K`;
  return String(value);
}

export function formatReleaseDate(date: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  } catch (err) {
    console.warn(`cannot format date: ${date}, error: ${err}`);
    return '';
  }
}
