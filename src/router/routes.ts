import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import Subscriptions from '@/pages/Subscriptions';
import Support from '@/pages/Support';
import type { ComponentType } from 'react';

export type PageRouteKey = 'home' | 'catalog' | 'support' | 'subscriptions';

export type DynamicRouteKey = 'catalogMovieDetails' | 'catalogShowDetails';
export type DynamicRouteParams = {
  slug: string;
};

export type RouteKey = PageRouteKey | DynamicRouteKey;

type DynamicRouteBuilder = (params: DynamicRouteParams) => string;

type RoutesConfig = Record<PageRouteKey, string> & Record<DynamicRouteKey, DynamicRouteBuilder>;

export const routes = {
  home: '/',
  catalog: '/catalog',
  support: '/support',
  subscriptions: '/subscriptions',

  catalogMovieDetails: ({ slug }) => `/catalog/movies/${slug}`,
  catalogShowDetails: ({ slug }) => `/catalog/shows/${slug}`,
} as const satisfies RoutesConfig;

export function getPath(route: PageRouteKey): string;
export function getPath(route: DynamicRouteKey, params: DynamicRouteParams): string;

export function getPath(route: RouteKey, params?: DynamicRouteParams): string {
  const value = routes[route];

  if (typeof value === 'function') {
    if (!params) throw new Error(`Params must be passed for dynamic route key ${route}`);
    return value(params);
  }

  return value;
}

export const routeComponents = {
  home: Home,
  catalog: Catalog,
  support: Support,
  subscriptions: Subscriptions,
} satisfies Record<PageRouteKey, ComponentType>;
