import ru from './ru';
import en from './en';

import type { Language, Messages } from '../types';
import type { NestedKeyOf } from './typed-keys';

export const messages: Record<Language, Messages> = {
  ru,
  en,
};

export type TranslationKey = NestedKeyOf<Messages>;
