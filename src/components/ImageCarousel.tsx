"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";

type ImageCarouselProps = {
  images: { src: string; alt?: string }[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative">
      {/* Custom arrows */}
      <button
        ref={prevRef}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2
                   h-7 w-7 rounded-full bg-white/80
                   flex items-center justify-center
                   text-[12px] text-blue-500
                   shadow hover:text-blue-700"
      >
        ‹
      </button>

      <button
        ref={nextRef}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2
                   h-7 w-7 rounded-full bg-white/80
                   flex items-center justify-center
                   text-[12px] text-blue-500
                   shadow hover:text-blue-700"
      >
        ›
      </button>

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={images.length > 1}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-8"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-[180px] rounded-xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt ?? "carousel image"}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
