export function getTitle(page: string, entityLabel?: string): string {
  return entityLabel ? `Stream Vibe | ${entityLabel} - ${page}` : `Stream Vibe | ${page}`;
}
