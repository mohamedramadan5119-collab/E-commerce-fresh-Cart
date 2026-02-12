"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Category } from "../../types/productinterface";

export default function Slider({ categories }: { categories: Category[] }) {
  return (
    <>
      <h2 className="text-primary font-bold text-2xl mb-4">Shop Categories</h2>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        allowTouchMove={true}
        spaceBetween={20}
        className="mySwiper mx-5"
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        style={{
          transitionTimingFunction: "linear",
        }}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="p-2">
              <Image
                className="w-full rounded-2xl h-[250px] object-cover shadow-sm"
                src={category.image}
                alt={category.name}
                width={600}
                height={300}
              />
              <h2 className="text-center text-primary font-bold p-3 truncate">
                {category.name}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
