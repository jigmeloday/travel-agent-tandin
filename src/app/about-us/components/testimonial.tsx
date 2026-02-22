/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

function Testimonial({ data }: any) {
  
  return (
    <div className="flex">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        spaceBetween={10}
        speed={1500} // fade duration
        loop={true} // infinite loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        slidesPerView={1} // default
        breakpoints={{
          // On small devices (<640px) => 1 slide
          0: { slidesPerView: 1 },
          // On tablets (≥640px) => 1 slide
          640: { slidesPerView: 1 },
          // On medium devices (≥768px) => 1 slide
          768: { slidesPerView: 1 },
          // On large devices (≥1024px) => 1 slide
          1024: { slidesPerView: 1 },
        }}
        className="w-full"
      >
        {data?.map((slide: any) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col items-center justify-center py-10 px-4 md:px-8">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">
                {slide.author}
              </h1>
              <p className="text-center text-base md:text-[14] lg:text-[16] font-bold text-black/70 mt-4">
                {slide.quote}
              </p>
              <p className="font-bold mt-3 text-sm md:text-base">
                {slide.date}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Testimonial;
