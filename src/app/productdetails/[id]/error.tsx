'use client'
import React from 'react'
import noProduct from '../../../aassets/images/NoProducts.svg'
import Image from 'next/image'

export default function Error() {
  return (
    <>
      <div className="container">
        <div className="flex w-full h-screen justify-center items-center">
          <Image src={noProduct} alt='noProduct'/>
        </div>
      </div>
    </>
  )
}
