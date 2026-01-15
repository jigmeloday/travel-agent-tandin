/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogSwapper({ swapper }: { swapper?: any }) {
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
      className="w-full h-full"
    >
      {swapper.map((slide: any) => (
        <SwiperSlide key={slide.id} className='cursor-pointer'>
        <Link href={`/blog/${slide.slug.current}`} >
          <div className="flex flex-col items-start mb-20">
            {/* Image */}
            <div className="w-full h-[60vh] relative">
              <Image
                src={slide.image.asset.url}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Text below the image */}
            <div className="mt-4 flex gap-1 text-gray-700">
              <span>{slide.place} |</span>
              <span>{slide.date} |</span>
              <span>{slide.tag}</span>
            </div>

            <p className="font-semibold mt-6 text-[24px]">{slide.title}</p>
            <p className="mt-4 text-[18px]">{slide.description}</p>
          </div>
        </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
