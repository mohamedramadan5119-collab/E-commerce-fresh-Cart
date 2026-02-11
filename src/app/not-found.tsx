import Image from 'next/image'
import React from 'react'
import imgNotFound from '../aassets/images/404.bcc156d7c71a6cc7b8c0.png'

export default function notfound() {
  return (
    <>
        <div className="container ">
          <div className='w-full h-screen flex justify-center items-center'>
            <Image  className=' w-full ' src={imgNotFound}  alt='not-found'></Image>
          </div>
        </div>
    </>
  )
}
