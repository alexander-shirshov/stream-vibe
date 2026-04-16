export const SUPPORTED_LANGUAGES = ['ru'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export function isLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

export interface Messages {
  header: {
    logoTitle: string;
    header: string;
  };

  headerActions: {
    search: string;
    notifications: string;
  };

  BurgerButton: {
    title: string;
  };

  link: {
    home: string;
    movies: string;
    support: string;
    subscriptions: string;
  };

  main: {
    pageTitle: string;
  };
}
