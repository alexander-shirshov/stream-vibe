import type { Currency } from '@/constants/currencies';

type LanguageConfig = {
  code: string;
  locale: string;
  approxCurrency: Currency | null;
};

export const LANGUAGES = [
  { code: 'ru', locale: 'ru-RU', approxCurrency: 'RUB' },
  { code: 'en', locale: 'en-US', approxCurrency: null },
] as const satisfies readonly LanguageConfig[];

export type Language = (typeof LANGUAGES)[number]['code'];

export type Locale = (typeof LANGUAGES)[number]['locale'];

export function isLanguage(value: string): value is Language {
  return LANGUAGES.some(language => language.code === value);
}

export function getLanguageConfig(language: Language) {
  return LANGUAGES.find(item => item.code === language) ?? LANGUAGES[0];
}

export function getApproxCurrency(language: Language) {
  return getLanguageConfig(language).approxCurrency;
}

export function getLocale(language: Language): Locale {
  return getLanguageConfig(language).locale;
}

type LocalizedText = Partial<Record<Language, string>>;

export function getLocalizedText(
  value: LocalizedText,
  lang: Language,
  fallbackLang: Language = 'en'
) {
  return value[lang] ?? value[fallbackLang] ?? '';
}

export interface Messages {
  lang: {
    ariaLabel: string;
  };

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

  banner: {
    cta: string;
    title: string;
    description: string;
  };

  main: {
    pageTitle: string;
    meta: string;
  };

  playButton: {
    title: string;
  };

  hero: {
    title: string;
    descr: string;
    cta: string;
  };

  categories: {
    title: string;
    descr: string;
  };

  CatalogItemCard: {
    durationHours: string;
    durationMinutes: string;
    releasedAt: string;
    ariaLabels: {
      duration: string;
      views: string;
      rating: string;
      season: string;
    };
  };

  slider: {
    nextButton: string;
    prevButton: string;
  };

  devices: {
    title: string;
    descr: string;
  };

  deviceCard: {
    smartphone: {
      title: string;
      descr: string;
    };
    console: {
      title: string;
      descr: string;
    };
    laptop: {
      title: string;
      descr: string;
    };
    tablet: {
      title: string;
      descr: string;
    };
    tv: {
      title: string;
      descr: string;
    };
    vr: {
      title: string;
      descr: string;
    };
  };

  questions: {
    title: string;
    descr: string;
    action: string;

    items: {
      whatIsStreamVibe: {
        question: string;
        answer: string;
      };
      cost: {
        question: string;
        answer: string;
      };
      content: {
        question: string;
        answer: string;
      };
      howToWatch: {
        question: string;
        answer: string;
      };
      sign: {
        question: string;
        answer: string;
      };
      trial: {
        question: string;
        answer: string;
      };
      support: {
        question: string;
        answer: string;
      };
      payment: {
        question: string;
        answer: string;
      };
      duplicate: {
        question: string;
        answer: string;
      };
    };
  };

  plans: {
    title: string;
    descr: string;
    mainAction: string;
    secondaryAction: string;
    approxPriceDisclaimer: string;
    periods: {
      day: string;
      week: string;
      month: string;
      year: string;
    };
    tabs: {
      monthly: string;
      yearly: string;
    };
    items: {
      basic: {
        title: string;
        descr: string;
      };
      standard: {
        title: string;
        descr: string;
      };
      premium: {
        title: string;
        descr: string;
      };
    };
  };

  catalogPage: {
    pageTitle: string;
    meta: string;
    heading: string;
    cta: string;
    actions: {
      add: string;
      like: string;
      sound: string;
    };
    catalogSections: {
      movies: string;
      shows: string;
    };
  };

  catalogEntity: {
    movie: {
      title: string;
      meta: string;
      details: string;
      description: string;
      cast: string;
      reviews: string;
      addReview: string;
      editReview: string;
      rating: string;
      release: string;
      languages: string;
      ratings: string;
      genres: string;
      director: string;
      music: string;
    };
    show: {
      title: string;
      meta: string;
      details: string;
      description: string;
      cast: string;
      reviews: string;
      addReview: string;
      editReview: string;
      rating: string;
      release: string;
      languages: string;
      ratings: string;
      genres: string;
      director: string;
      music: string;
    };
  };

  // moviePage: {
  //   pageTitle: string;
  // };
  // showPage: {
  //   pageTitle: string;
  // };
}
