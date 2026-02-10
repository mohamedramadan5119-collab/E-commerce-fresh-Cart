'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import {Autoplay  } from 'swiper/modules'; 
import Image from 'next/image'
import { Category } from '@/app/types/productinterface';

export default function Slider({categories}:{categories:Category[]}) {
  return (
    <>
    <h2 className='text-primary font-bold text-2xl'>Shop Categories:</h2>
        <Swiper
                modules={[Autoplay , ]}
                autoplay={{
                    delay:2000 
                }}
                speed={1500} 
                loop={true} 
                allowTouchMove={false} 
                slidesPerView={4}
                spaceBetween={0}
                className="mySwiper mx-5"
                style={{
                    transitionTimingFunction: 'linear', 
                }}
                    
                    
                >
                    
                    {categories?.map((category , index)=>{ return <div key={index}> 
                        <div>
                            <SwiperSlide className='m-5' key={category._id}><Image className='w-full rounded-2xl  h-[300px]  object-cover  ' src={category.image} alt='img1' width={600} height={300}/>
                            <h2 className='text-center text-primary font-bold p-3'>{category.name}</h2>
                    </SwiperSlide>
                    
                        </div>
                        
                    </div>})}
                    


                    
                </Swiper>    
    </>
  )
}
