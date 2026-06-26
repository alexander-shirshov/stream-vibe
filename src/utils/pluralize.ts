export function pluralizeRu(number: number, forms: string[]): string {
  const abs = Math.abs(Number(number)) % 100;
  const lastDigit = abs % 10;

  if (abs >= 11 && abs <= 14) {
    return forms[2];
  }

  if (lastDigit === 1) {
    return forms[0];
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1];
  }

  return forms[2];
}

export function formatEpisodesCountRu(count: number): string {
  return `${count} ${pluralizeRu(count, ['серия', 'серии', 'серий'])}`;
}
