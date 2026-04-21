/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import 'swiper/css';
import 'swiper/css/pagination';
import { urlFor } from '@/lib/senity.image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

export default function HotelSlider({ data }: any) {
  return (
    <div className="relative w-full overflow-hidden px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={3}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {data?.map((hotel: any) => (
          <SwiperSlide key={hotel.slug?.current}>
            <Link
              href={`/exquisite-stays/${hotel.slug?.current}`}
              className="relative w-full aspect-square text-center overflow-hidden group cursor-pointer block"
            >
              <Image
                src={urlFor(hotel.thumbnailImage).url()}
                alt={hotel.title || 'Hotel Image'}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 transition-all duration-500 ease-in-out flex flex-col items-center justify-center">
                <h2 className="relative inline-block text-white after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white/80 after:transition-all after:duration-300 after:ease-out group-hover:after:left-0 group-hover:after:w-full">
                  {hotel.title}
                </h2>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
