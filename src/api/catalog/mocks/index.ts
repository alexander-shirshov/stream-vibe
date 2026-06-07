import { homeCategoriesMock } from './homeCategories.mock';
import { catalogBannerMock } from './catalogBanner.mock';
import {
  catalogMoviesSectionGenresMock,
  catalogMoviesSectionTopMock,
  catalogMoviesSectionTrendingMock,
  catalogMoviesSectionMustWatchMock,
  catalogMoviesSectionNewMock,
} from './catalogMoviesSection.mock';
import {
  catalogShowsSectionTopMock,
  catalogShowsSectionGenresMock,
  catalogShowsSectionTrendingMock,
  catalogShowsSectionNewMock,
  catalogShowsSectionMustWatchMock,
} from './catalogShowsSection.mock';

import type { CatalogSectionDto, CatalogSectionKey } from '../catalog.types';

export const catalogSectionsMock: Partial<Record<CatalogSectionKey, CatalogSectionDto>> = {
  homeCategories: homeCategoriesMock,

  catalogBanner: catalogBannerMock,
  catalogMoviesGenres: catalogMoviesSectionGenresMock,
  catalogMoviesPopular: catalogMoviesSectionTopMock,
  catalogMoviesTrending: catalogMoviesSectionTrendingMock,
  catalogMoviesNewReleases: catalogMoviesSectionNewMock,
  catalogMoviesMustWatch: catalogMoviesSectionMustWatchMock,

  catalogShowsGenres: catalogShowsSectionGenresMock,
  catalogShowsPopular: catalogShowsSectionTopMock,
  catalogShowsTrending: catalogShowsSectionTrendingMock,
  catalogShowsNewReleases: catalogShowsSectionNewMock,
  catalogShowsMustWatch: catalogShowsSectionMustWatchMock,
};
