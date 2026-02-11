import React from "react";
import BreadcrumbSetter from "../../_componants/BreadcrumbSetter";
import Image from "next/image";

export default async function CategoryDetails({ params }: any) {
  const { id } = await params;
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
  );
  const result = await response.json();
  const category = result.data;

  return (
    <>
      <BreadcrumbSetter name={category.name} />
      <div className="container mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/3 flex justify-center border-r border-gray-100 pr-0 md:pr-10">
            <Image
              src={category.image}
              alt={category.name}
              className="max-h-64 object-contain"
            />
          </div>

          <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
            <span className="text-gray-400 text-sm">Categories / Details</span>
            <h1 className="text-5xl font-bold text-primary">{category.name}</h1>
            <p className="text-gray-400 font-mono tracking-widest uppercase text-xs">
              SLUG: {category.slug}
            </p>

            <div className="h-[1px] bg-gray-100 w-full my-6"></div>

            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              This category features a wide range of premium products. You can
              find all products related to
              <span className="font-bold text-gray-800 px-1">
                {category.name}
              </span>{" "}
              in our store.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
