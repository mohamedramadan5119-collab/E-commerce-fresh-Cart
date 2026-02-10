'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"
import Image from "next/image"

export function ProductImg({images}: {images: string[]}) {
  return (



<Carousel   opts={{
    loop: true,
    
  }}
  plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
  >
  <CarouselContent>
        {images.map((src)=>{ return  <CarouselItem key={src} >
                                <Image 
                                width={300}
                                height={400}
                                className='w-full' 
                                src={src} 
                                alt={src} 
                                />
                                </CarouselItem>})}
  </CarouselContent>

</Carousel>
  )
}
