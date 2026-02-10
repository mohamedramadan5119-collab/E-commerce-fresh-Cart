import BreadcrumbSetter from '@/app/_componants/BreadcrumbSetter';
import Image from 'next/image';
import React from 'react';

interface Props {
  params: { id: string };
}

export default async function BrandDetails({ params }: Props) {
  const { id } = await params;
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
    cache: 'no-store'
  });
  console.log(response);
  


  if (!response.ok) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-600">Sorry, Brand details not found!</h2>
      </div>
    );
  }

  const result = await response.json();
  const brand = result.data; 



  return (
    
    <div className="container mx-auto my-10  px-4">
        <BreadcrumbSetter name={brand.name} />
      <div className=" mx-auto bg-white  rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between md:flex-row">
        
        <div className="md:w-1/3 relative bg-gray-50  flex items-center justify-center">
          <div className=" w-full h-64">
            <Image 
              src={brand.image} 
              alt={brand.name} 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <nav className="text-sm text-gray-400 mb-4">Brands / Details</nav>
          <h1 className="text-4xl text-primary text-main mb-2">{brand.name}</h1>
          <p className="text-gray-400 mb-6 uppercase tracking-tighter">Slug: {brand.slug}</p>
          
          <div className="border-t pt-6">
            <p className="text-gray-600 leading-relaxed">
              This brand is one of our premium partners. You can find all products related to 
              <span className="font-bold text-main"> {brand.name} </span> in our store.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}