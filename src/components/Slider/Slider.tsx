import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SliderNavigation from '@/components/Slider/components/SliderNavigation';

import React, { Children } from 'react';

type SliderProps = {
  children: React.ReactNode;
  navTargetElementId?: string;
};

// const defaultSliderParams = {
//   slidesPerView: 5,
//   slidesPerGroup: 5,
//   spaceBetween: 30,
// };

export default function Slider({ children, navTargetElementId }: SliderProps) {
  return (
    <div className="slider">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={5}
        slidesPerGroup={5}
        spaceBetween={30}
        className="slider__swiper"
      >
        {Children.map(children, (slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>

      {!navTargetElementId && <SliderNavigation className="slider__navigation" />}
    </div>
  );
}
