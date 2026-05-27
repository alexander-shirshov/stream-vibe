import type { CatalogSectionKey } from '@/api/catalog/catalog.types';
import type { SwiperOptions } from 'swiper/types';

export const catalogSectionSliderConfig: Partial<Record<CatalogSectionKey, SwiperOptions>> = {
  catalogMoviesPopular: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 30,
    allowTouchMove: false,
    watchOverflow: true,
    freeMode: false,
    breakpoints: {
      0: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        allowTouchMove: true,
      },
      481: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
        allowTouchMove: true,
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        allowTouchMove: true,
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
        allowTouchMove: false,
      },
      1441: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 30,
        allowTouchMove: false,
      },
    },
  },
};
