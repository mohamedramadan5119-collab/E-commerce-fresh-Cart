import React from 'react';
import Link from 'next/link';
import BreadcrumbSetter from '../_componants/BreadcrumbSetter';

export default async function Category() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories');
  const result = await response.json();
  const categories = result.data;

  return (
    <>
      <BreadcrumbSetter name="Categories" />
      <section className="py-12  bg-opacity-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-primary">Our Categories</h1>
            <p className="text-gray-500">Explore products by their categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((cat: any) => (
              <Link href={`/categorydetails/${cat._id}`} key={cat._id} 
                    className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-transparent  overflow-hidden text-center p-4">
                <div className="h-48 w-full relative mb-4">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-bold text-gray-700 group-hover:text-primary">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}