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
    catalog: string;
    movies: string;
    shows: string;
    support: string;
    subscriptions: string;
  };

  footerLink: {
    home: string;
    homeCategories: string;
    homeDevices: string;
    homePricing: string;
    homeFaq: string;
    movies: string;
    moviesGenres: string;
    moviesTrending: string;
    moviesNew: string;
    moviesPopular: string;
    shows: string;
    showsGenres: string;
    showsTrending: string;
    showsNew: string;
    showsPopular: string;
    support: string;
    supportContact: string;
    subscriptions: string;
    subscriptionsPlans: string;
    subscriptionsFeatures: string;
    termsOfUse: string;
    privacyPolicy: string;
    cookiePolicy: string;
  };

  socials: {
    title: string;
    facebook: string;
    x: string;
    linkedin: string;
  };

  main: {
    pageTitle: string;
  };
}
