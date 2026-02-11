import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Brands() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands?limit=10`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const result = await response.json();
  const allBrands = result.data;

  if (!response.ok) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-red-600 font-bold">
          Sorry, an error occurred while loading the data.
        </h2>
        <p>Please check your internet connection and try again.</p>
      </div>
    );
  }

  if (!allBrands || allBrands.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 italic">
          No brands available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <div className="flex items-center justify-between mb-8 pb-4 ">
        <div>
          <h2 className="text-3xl font-extrabold text-primary text-main uppercase tracking-wider">
            Popular Brands
          </h2>
          <p className="text-gray-500 mt-1">Selected top brands for you</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {allBrands?.map((brand: any) => (
          <Link href={`/brands/${brand._id}`} key={brand._id}>
            <div
              key={brand._id}
              className="group flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-main transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full h-24 mb-3">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-bold text-primary group-hover:text-main transition-colors">
                {brand.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
