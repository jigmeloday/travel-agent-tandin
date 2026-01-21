/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { urlFor } from '@/lib/senity.image';

export default function HeroSwapper({ swapper }: { swapper: any }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Force play videos (some browsers block autoplay without this)
    const videoEls = document.querySelectorAll('video');
    videoEls.forEach((v) => v.play().catch(() => console.log('Video autoplay blocked')));
  }, []);

  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      pagination={{ clickable: true }}
      speed={4500}
      loop={true}
      autoplay={{ delay: 5500, disableOnInteraction: false }}
      slidesPerView={1}
      className="w-full h-screen relative"
    >
      {swapper.map((slide: any, idx: number) => (
        <SwiperSlide key={idx}>
          <div className="relative w-full h-full">

            {/* 🌄 IMAGE */}
            {slide.type === 'image' && slide.image && (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${urlFor(slide.image).url()})` }}
              />
            )}

            {/* ▶️ SANITY VIDEO */}
            {slide.type === 'video' && slide.video?.asset?.url && (
              <>
                <video
                  src={slide.video.asset.url}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10"></div>
              </>
            )}

            {/* TEXT CONTENT */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ease-out
              ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <h2 className="text-white text-3xl lg:text-5xl font-bold mb-4 animate-fadeIn">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-white/80 text-lg lg:text-2xl max-w-3xl animate-fadeIn delay-200">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
