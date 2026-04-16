import ru from './ru';

import type { Language, Messages } from '../types';
import type { NestedKeyOf } from './typed-keys';

export const messages: Record<Language, Messages> = {
  ru,
};

export type TranslationKey = NestedKeyOf<Messages>;
