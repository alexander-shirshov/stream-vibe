export const SUPPORTED_LANGUAGES = ['ru', 'en'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export function isLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
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

  main: {
    pageTitle: string;
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

  categoryCard: {
    action: string;
    adventure: string;
    comedy: string;
    drama: string;
    horror: string;
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
}
