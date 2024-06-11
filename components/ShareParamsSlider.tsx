'use client';
import React from 'react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const ShareParamsSlider = ({ shareParams }: { shareParams: any }) => {
  const slideBgColors = [
    'bg-color-primary-1',
    'bg-color-primary-2',
    'bg-color-black',
  ];

  return (
    <div className="w-full h-[20rem] mt-[3rem] sm:mt-0 sm:block hidden ">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: false,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="w-full h-full"
      >
        {shareParams.map((params: any, i: number) => (
          <SwiperSlide key={i}>
            <div
              className={` h-full w-full rounded-md flex   flex-col items-center justify-center text-center  bg-color-primary-1 shadow-md  text-color-secondary-1 text-[1.7rem] font-bold  `}
            >
              <div className="flex items-center flex-col   mb-[.5rem]">
                <div className="  text-color-secondary-1 mb-[1rem]">
                  {params.icon}
                </div>
                <p className="text-[1.8rem] font-semibold  text-color-secondary-1 uppercase ">
                  {params.title}
                </p>
              </div>
              <p>{params.value}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShareParamsSlider;
