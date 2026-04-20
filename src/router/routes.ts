import Home from '@/pages/Home';
import Movies from '@/pages/Movies/Movies';
import Shows from '@/pages/Shows';
import Catalog from '@/pages/Catalog';
import Subscriptions from '@/pages/Subscriptions';
import Support from '@/pages/Support';
import type { ComponentType } from 'react';

export type PageRouteKey =
  | 'home'
  | 'catalog'
  | 'catalogMovies'
  | 'catalogShows'
  | 'support'
  | 'subscriptions';

export type DynamicRouteKey = 'catalogMoviesGenre' | 'catalogShowsGenre';
export type RouteKey = PageRouteKey | DynamicRouteKey;

type DynamicRouteBuilder = (genre: string) => string;

type RoutesConfig = Record<PageRouteKey, string> & Record<DynamicRouteKey, DynamicRouteBuilder>;

export const routes = {
  home: '/',
  catalog: '/catalog',
  catalogMovies: '/catalog/movies',
  catalogMoviesGenre: (genre: string) => `/catalog/movies/genres/${genre}`,
  catalogShows: '/catalog/shows',
  catalogShowsGenre: (genre: string) => `/catalog/shows/genres/${genre}`,
  support: '/support',
  subscriptions: '/subscriptions',
} as const satisfies RoutesConfig;

export type GenreRouteParams = {
  genre: string;
};

export function getPath(route: PageRouteKey): string;
export function getPath(route: DynamicRouteKey, params: GenreRouteParams): string;

export function getPath(route: RouteKey, params?: GenreRouteParams): string {
  const value = routes[route];

  if (typeof value === 'function') {
    if (!params) throw new Error(`Params must be passed for dynamic route key ${route}`);
    return value(params.genre);
  }
  return value;
}

export const routeComponents = {
  home: Home,
  catalog: Catalog,
  catalogMovies: Movies,
  catalogShows: Shows,
  support: Support,
  subscriptions: Subscriptions,
} satisfies Record<PageRouteKey, ComponentType>;
