import { homeCategoriesMock } from './homeCategories.mock';
import { catalogBannerMock } from './catalogBanner.mock';
import {
  catalogMoviesSectionGenresMock,
  catalogMoviesSectionTopMock,
} from './catalogMoviesSection.mock';
import {
  catalogShowsSectionTopMock,
  catalogShowsSectionGenresMock,
} from './catalogShowsSection.mock';

import type { CatalogSectionDto, CatalogSectionKey } from '../catalog.types';

export const catalogSectionsMock: Partial<Record<CatalogSectionKey, CatalogSectionDto>> = {
  homeCategories: homeCategoriesMock,

  catalogBanner: catalogBannerMock,
  catalogMoviesGenres: catalogMoviesSectionGenresMock,
  catalogMoviesPopular: catalogMoviesSectionTopMock,

  catalogShowsGenres: catalogShowsSectionGenresMock,
  catalogShowsPopular: catalogShowsSectionTopMock,
};
