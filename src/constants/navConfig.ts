import type { Messages } from '@/i18n/types';
import { type GenreRouteParams } from '@/router/routes';
import type { PageRouteKey, DynamicRouteKey } from '@/router/routes';

type HeaderNavItem = {
  route: PageRouteKey;
  labelKey: keyof Messages['link'];
};

export const sectionIds = {
  categories: 'categories',
  devices: 'devices',
  pricing: 'pricing',
  faq: 'faq',
} as const;

export const headerNav = [
  { route: 'home', labelKey: 'home' },
  { route: 'catalog', labelKey: 'catalog' },
  { route: 'support', labelKey: 'support' },
  { route: 'subscriptions', labelKey: 'subscriptions' },
] as const satisfies HeaderNavItem[];

export type FooterNavLink =
  | {
      route: PageRouteKey;
      labelKey: keyof Messages['footerLink'];
    }
  | {
      route: DynamicRouteKey;
      params: GenreRouteParams;
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
  | { route: DynamicRouteKey; params: GenreRouteParams }
  | { href: string };

export type FooterSection = {
  main: FooterNavLink;
  links: FooterNavLink[];
};

export type FooterSocialSection = {
  titleKey: keyof Messages['socials'];
  links: FooterSocialLink[];
};
