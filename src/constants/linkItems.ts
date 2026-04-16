import type { Messages } from '@/i18n/types';
import Home from '@/pages/Home';
import Movies from '@/pages/Movies';
import type { ComponentType } from 'react';

type RouteItem = {
  path: string;
  component: ComponentType;
  inMenu?: boolean;
};

export const linkItems = {
  home: {
    path: '/',
    component: Home,
    inMenu: true,
  },
  movies: {
    path: '/movies',
    component: Movies,
    inMenu: true,
  },
  support: {
    path: '/support',
    component: Movies,
    inMenu: true,
  },
  subscriptions: {
    path: '/subccriptions',
    component: Movies,
    inMenu: true,
  },
} as const satisfies Record<keyof Messages['link'], RouteItem>;

export type LinkKey = keyof typeof linkItems;
