/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function TripSlider({ images }: { images: any[] }) {
  const swiperRef = useRef<any>(null);

  const updateScales = () => {
    if (!swiperRef.current) return;
    const slides = swiperRef.current.slides;
    const activeIndex = swiperRef.current.activeIndex;

    slides?.forEach((slide: HTMLElement, i: number) => {
      // position relative to active
      const index = (i - activeIndex + slides.length) % slides.length;

      if (index === 0 || index === 3) {
        slide.style.transform = 'scaleY(0.7)';
      } else {
        slide.style.transform = 'scaleY(1)';
      }

      slide.style.transition = 'transform 0.3s';
    });
  };

  useEffect(() => {
    updateScales();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-center text-[#7a0c21]">
        Image Gallery
      </h2>
      <p className="text-xl mt-1 mb-10 text-center">Recent Trip Image</p>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={updateScales}
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{
          1280: { slidesPerView: 4 },
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 1 },
          0: { slidesPerView: 2 },
        }}
        className="w-full"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="flex justify-center">
            <div className="w-[340px] h-[450px] max-md:w-[260px] max-md:h-[360px] max-sm:w-[220px] max-sm:h-[300px]">
              <Image
                src={img.asset.url}
                alt="slider"
                width={300}
                height={450}
                unoptimized
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
