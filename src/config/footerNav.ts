import type { FooterSection, FooterSocialSection, FooterNavLink } from '@/constants/navConfig';

import Facebook from '@/assets/icons/facebook.svg?react';
import X from '@/assets/icons/x.svg?react';
import Linkedin from '@/assets/icons/linkedin.svg?react';

export const footerNavSections: FooterSection[] = [
  {
    main: { route: 'home', labelKey: 'home' },
    links: [
      { href: '#categories', labelKey: 'homeCategories' },
      { href: '#devices', labelKey: 'homeDevices' },
      { href: '#pricing', labelKey: 'homePricing' },
      { href: '#faq', labelKey: 'homeFaq' },
    ],
  },
  {
    main: { route: 'catalogMovies', labelKey: 'movies' },
    links: [
      { href: '#genres', labelKey: 'moviesGenres' },
      { href: '#trending', labelKey: 'moviesTrending' },
      { href: '#newRelease', labelKey: 'moviesNew' },
      { href: '#popular', labelKey: 'moviesPopular' },
    ],
  },
  {
    main: { route: 'catalogShows', labelKey: 'shows' },
    links: [
      { href: '#genres', labelKey: 'showsGenres' },
      { href: '#trending', labelKey: 'showsTrending' },
      { href: '#newRelease', labelKey: 'showsNew' },
      { href: '#popular', labelKey: 'showsPopular' },
    ],
  },
  {
    main: { route: 'support', labelKey: 'support' },
    links: [{ href: '#contact', labelKey: 'supportContact' }],
  },
  {
    main: { route: 'subscriptions', labelKey: 'subscriptions' },
    links: [
      { href: '#plans', labelKey: 'subscriptionsPlans' },
      { href: '#features', labelKey: 'subscriptionsFeatures' },
    ],
  },
];

export const footerSocialSection: FooterSocialSection = {
  titleKey: 'title',
  links: [
    { href: 'https://www.facebook.com/', icon: Facebook, labelKey: 'facebook' },
    { href: 'https://www.x.com/', icon: X, labelKey: 'x' },
    { href: 'https://www.linkedin.com/', icon: Linkedin, labelKey: 'linkedin' },
  ],
};

export const footerExtraSection: FooterNavLink[] = [
  {
    href: '/',
    labelKey: 'termsOfUse',
  },
  {
    href: '/',
    labelKey: 'privacyPolicy',
  },
  {
    href: '/',
    labelKey: 'cookiePolicy',
  },
];
