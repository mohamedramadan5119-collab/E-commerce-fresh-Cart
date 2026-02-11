"use client";
import React from "react";
import img1 from "../../../aassets/images/slider-image-1.jpeg";
import img2 from "../../../aassets/images/slider-image-2.jpeg";
import img3 from "../../../aassets/images/slider-image-3.jpeg";
import img4 from "../../../aassets/images/slider-2.jpeg";
import img5 from "../../../aassets/images/grocery-banner-2.jpeg";
import img6 from "../../../aassets/images/grocery-banner.png";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function Mainslider() {
  return (
    <>
      <div className="flex my-5">
        <div className="w-full px-4   md:w-3/4  ">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 1500,
            }}
            speed={1000}
            loop={true}
            allowTouchMove={false}
            slidesPerView={1}
            spaceBetween={0}
            className="mySwiper rounded-2xl  "
            style={{
              transitionTimingFunction: "linear",
            }}
          >
            <SwiperSlide>
              <Image
                className="w-full h-[400px] object-cover"
                src={img1}
                alt="img1"
                width={600}
                height={300}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="w-full h-[400px] object-cover"
                src={img2}
                alt="img2"
                width={600}
                height={300}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="w-full h-[400px] object-cover"
                src={img3}
                alt="img3"
                width={600}
                height={300}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="w-1/4 ms-5 hidden   md:block">
          <Image
            className="w-full rounded-4xl h-[200px] "
            src={img5}
            alt="img5"
            width={200}
            height={200}
          />
          <Image
            className="w-full rounded-4xl h-[200px] "
            src={img6}
            alt="img6"
            width={200}
            height={200}
          />
        </div>
      </div>
    </>
  );
}
