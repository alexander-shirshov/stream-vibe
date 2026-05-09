import type { Messages } from '@/i18n/types';

export const questionItems = [
  'whatIsStreamVibe',
  'cost',
  'content',
  'howToWatch',
  'sign',
  'trial',
  'support',
  'payment',
  // 'duplicate',
] as const satisfies Array<keyof Messages['questions']['items']>;
