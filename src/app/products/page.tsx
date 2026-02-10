import React from 'react';
import { ProductItem } from "../_componants/productimg/productimg.tsx";
import BreadcrumbSetter from '../_componants/BreadcrumbSetter';
import ProductCard from "../_componants/productCard/productCard.tsx"; 

async function getProducts(): Promise<ProductItem[]> {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
    next: { revalidate: 60 } 
  });
  if (!response.ok) throw new Error('Failed to fetch products');
  const result = await response.json();
  return result.data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="py-12  min-h-screen">
      <BreadcrumbSetter name="Products" />
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#0aad0a]">All Products</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((item) => (
            <div key={item._id} className="flex justify-center">
              <ProductCard prod={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}