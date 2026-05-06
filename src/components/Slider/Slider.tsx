import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import React, { Children } from 'react';

type SliderProps = {
  children: React.ReactNode;
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  paginationRef?: React.RefObject<HTMLDivElement | null>;
  onLockChange?: (locked: boolean) => void;
};

export default function Slider({
  children,
  prevRef,
  nextRef,
  paginationRef,
  onLockChange,
}: SliderProps) {
  const handleLockChange = (swiper: { isLocked: boolean }) => {
    onLockChange?.(swiper.isLocked);
  };

  return (
    <div className="slider">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 20 },
          481: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
          1024: { spaceBetween: 20, allowTouchMove: false },
          1441: { spaceBetween: 30, allowTouchMove: false },
        }}
        // className="slider__swiper"

        onInit={handleLockChange}
        onBreakpoint={handleLockChange}
        onResize={handleLockChange}
        onBeforeInit={swiper => {
          if (typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation = {
              ...swiper.params.navigation,
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            };
          }

          if (typeof swiper.params.pagination !== 'boolean') {
            swiper.params.pagination = {
              ...swiper.params.pagination,
              el: paginationRef?.current,
              clickable: true,
              bulletClass: 'slider-navigation__pagination-bullet',
              bulletActiveClass: 'is-active',
            };
          }
        }}
        onSwiper={swiper => {
          setTimeout(() => {
            if (typeof swiper.params.pagination !== 'boolean' && paginationRef?.current) {
              swiper.params.pagination = {
                ...swiper.params.pagination,
                el: paginationRef.current,
                clickable: true,
                bulletClass: 'slider-navigation__pagination-bullet',
                bulletActiveClass: 'is-active',
              };

              swiper.pagination.init();
              swiper.pagination.render();
              swiper.pagination.update();
            }

            if (
              typeof swiper.params.navigation !== 'boolean' &&
              prevRef.current &&
              nextRef.current
            ) {
              swiper.params.navigation = {
                ...swiper.params.navigation,
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              };

              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
      >
        {Children.map(children, (slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
