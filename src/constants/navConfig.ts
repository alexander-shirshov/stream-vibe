import type { Messages } from '@/i18n/types';
import type { PageRouteKey, DynamicRouteKey, DynamicRouteParams } from '@/router/routes';
import type { CatalogSectionKey } from '@/api/catalog/catalog.types';

type HeaderNavItem = {
  route: PageRouteKey;
  labelKey: keyof Messages['link'];
};

export const sectionIds = {
  categories: 'categories',
  devices: 'devices',
  pricing: 'pricing',
  faq: 'faq',

  movies: 'movies',
  moviesGenres: 'moviesGenres',
  moviesTrending: 'moviesTrending',
  moviesNew: 'moviesNew',
  moviesPopular: 'moviesPopular',
  moviesMustWatch: 'moviesMustWatch',

  shows: 'shows',
  showsGenres: 'showsGenres',
  showsTrending: 'showsTrending',
  showsNew: 'showsNew',
  showsPopular: 'showsPopular',
  showsMustWatch: 'showsMustWatch',
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export const catalogSectionIds: Partial<Record<CatalogSectionKey, SectionId>> = {
  catalogMoviesGenres: sectionIds.moviesGenres,
  catalogMoviesTrending: sectionIds.moviesTrending,
  catalogMoviesNewReleases: sectionIds.moviesNew,
  catalogMoviesPopular: sectionIds.moviesPopular,
  catalogMoviesMustWatch: sectionIds.moviesMustWatch,

  catalogShowsGenres: sectionIds.showsGenres,
  catalogShowsTrending: sectionIds.showsTrending,
  catalogShowsNewReleases: sectionIds.showsNew,
  catalogShowsPopular: sectionIds.showsPopular,
  catalogShowsMustWatch: sectionIds.showsMustWatch,
};

export const headerNav = [
  { route: 'home', labelKey: 'home' },
  { route: 'catalog', labelKey: 'catalog' },
  { route: 'support', labelKey: 'support' },
  { route: 'subscriptions', labelKey: 'subscriptions' },
] as const satisfies HeaderNavItem[];

export type FooterNavLink =
  | {
      route: PageRouteKey;
      hash?: SectionId;
      labelKey: keyof Messages['footerLink'];
    }
  | {
      route: DynamicRouteKey;
      params: DynamicRouteParams;
      hash?: SectionId;
      labelKey: keyof Messages['footerLink'];
    }
  | {
      href: string;
      labelKey: keyof Messages['footerLink'];
    };

export type FooterSocialLink = {
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  labelKey: keyof Messages['socials'];
};

export type ButtonNavLink =
  | { route: PageRouteKey }
  | { route: DynamicRouteKey; params: DynamicRouteParams }
  | { href: string };

export type FooterSection = {
  main: FooterNavLink;
  links: FooterNavLink[];
};

export type FooterSocialSection = {
  titleKey: keyof Messages['socials'];
  links: FooterSocialLink[];
};
