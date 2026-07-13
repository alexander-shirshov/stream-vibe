import type { FooterSection, FooterSocialSection, FooterNavLink } from '@/constants/navConfig';

import { sectionIds } from '@/constants/navConfig';

import Facebook from '@/assets/icons/facebook.svg?react';
import X from '@/assets/icons/x.svg?react';
import Linkedin from '@/assets/icons/linkedin.svg?react';

export const footerNavSections: FooterSection[] = [
  {
    main: { route: 'home', labelKey: 'home' },
    links: [
      { route: 'home', hash: sectionIds.categories, labelKey: 'homeCategories' },
      { route: 'home', hash: sectionIds.devices, labelKey: 'homeDevices' },
      { route: 'home', hash: sectionIds.pricing, labelKey: 'homePricing' },
      { route: 'home', hash: sectionIds.faq, labelKey: 'homeFaq' },
    ],
  },
  {
    main: { route: 'catalog', hash: sectionIds.movies, labelKey: 'movies' },
    links: [
      { route: 'catalog', hash: sectionIds.moviesGenres, labelKey: 'moviesGenres' },
      { route: 'catalog', hash: sectionIds.moviesTrending, labelKey: 'moviesTrending' },
      { route: 'catalog', hash: sectionIds.moviesNew, labelKey: 'moviesNew' },
      { route: 'catalog', hash: sectionIds.moviesPopular, labelKey: 'moviesPopular' },
    ],
  },
  {
    main: { route: 'catalog', hash: sectionIds.shows, labelKey: 'shows' },
    links: [
      { route: 'catalog', hash: sectionIds.showsGenres, labelKey: 'showsGenres' },
      { route: 'catalog', hash: sectionIds.showsTrending, labelKey: 'showsTrending' },
      { route: 'catalog', hash: sectionIds.showsNew, labelKey: 'showsNew' },
      { route: 'catalog', hash: sectionIds.showsPopular, labelKey: 'showsPopular' },
    ],
  },
  {
    main: { route: 'support', labelKey: 'support' },
    links: [
      {
        route: 'support',
        hash: sectionIds.support,
        labelKey: 'supportContact',
      },
    ],
  },
  {
    main: {
      route: 'subscriptions',
      hash: sectionIds.subscriptionsPlans,
      labelKey: 'subscriptions',
    },
    links: [
      {
        route: 'subscriptions',
        hash: sectionIds.subscriptionsPlans,
        labelKey: 'subscriptionsPlans',
      },
      {
        route: 'subscriptions',
        hash: sectionIds.subscriptionsComparison,
        labelKey: 'subscriptionsFeatures',
      },
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
