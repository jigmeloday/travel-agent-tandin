/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { urlFor } from '@/lib/senity.image'

// const slides = [
//   { img: 'images/dummy/img7.jpg', id: 1, title: 'Discover Bhutan, Beyond Imagination' },
//   { img: 'images/dummy/img5.jpg', id: 2, title: 'Every Journey, Exclusively Yours' },
//   { img: 'images/slide.jpg', id: 3, title: 'Where Culture, Nature, and Luxury Meet' },
//   { img: 'images/dummy/img1.jpg', id: 4, title: 'Travel Deeper. Experience Bhutan' },
//   { img: 'images/dummy/img2.jpg', id: 5, title: 'Crafting Moments, Curating Memories' },

// ];

export default function HeroSwapper({ swapper }: {swapper: any}) {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      pagination={{ clickable: true }}
      spaceBetween={10}
      speed={1500} // fade duration
      loop={true} // infinite loop
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      slidesPerView={1}
      className="w-full h-screen"
    >
      {swapper.map((slide: any) => (
        <SwiperSlide key={slide.id}>
          <div
            className="w-full h-full relative flex items-center justify-center px-[32px]"
            style={{
              backgroundImage: `url(${urlFor(slide.image).url()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white text-3xl lg:text-5xl font-bold mb-2">
            {slide.title}
          </h2>
          
        </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
