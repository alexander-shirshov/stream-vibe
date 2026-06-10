export function normalizeRating(value?: number): number | null {
  if (typeof value !== 'number') return null;
  if (!Number.isFinite(value)) return null;
  if (value < 0 || value > 5) return null;

  return value;
}

export function normalizeRatingCount(value?: number): number | null {
  if (typeof value !== 'number') return null;
  if (!Number.isFinite(value)) return null;
  if (value < 0) return null;

  return value;
}
