import React from "react";
import { ProductItem } from "@/app/types/productinterface";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ProductImg } from "../../_componants/productimg/productimg";
import AddBtn from "../../_componants/addBtn/addbtn";
import BreadcrumbSetter from "../../_componants/BreadcrumbSetter";

type myprops = {
  params: {
    id: string;
  };
};

export default async function ProductDetails(props: myprops) {
  const { id } = await props.params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { method: "GET" },
  );
  const { data: singleProduct }: { data: ProductItem } = await response.json();

  return (
    <>
      <BreadcrumbSetter name={singleProduct.title} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-screen-xl mx-auto p-4 md:p-8">
        <div className="md:col-span-1 flex justify-center items-center border rounded-3xl shadow-sm bg-white p-4 md:p-6 md:sticky md:top-24 transition-all">
          <ProductImg images={singleProduct.images} />
        </div>

        <div className="md:col-span-2 w-full">
          <Card className="border-none shadow-none relative bg-transparent p-0">
            <CardHeader className="space-y-6 p-0">
              <div className=" flex gap-5  ">
                <div>
                  <Badge
                    variant="default"
                    className="bg-primary hover:bg-green-700 text-sm px-4 py-1 rounded-full border-none"
                  >
                    {singleProduct.brand.name}
                  </Badge>
                </div>

                <div>
                  {singleProduct.ratingsAverage > 4.5 && (
                    <Badge className="bg-primary hover:bg-green-700 text-sm px-4 py-1 rounded-full border-none">
                      Top Rated
                    </Badge>
                  )}
                </div>
              </div>

              <CardTitle className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight">
                {singleProduct.title}
              </CardTitle>

              <CardDescription className="text-base md:text-lg text-gray-500 leading-relaxed italic font-medium">
                {singleProduct.description}
              </CardDescription>

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="text-xs md:text-sm px-3 py-1 bg-gray-100 text-gray-600 border-none"
                >
                  {singleProduct.category.name}
                </Badge>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                      Price
                    </span>
                    <span className="font-black text-3xl md:text-4xl text-green-600">
                      {singleProduct.price}{" "}
                      <span className="text-sm font-bold">EGP</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-4 py-2 rounded-2xl shadow-sm">
                    <span className="font-black text-xl text-yellow-700">
                      {singleProduct.ratingsAverage}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#fac824"
                      viewBox="0 0 24 24"
                      className="size-6 text-yellow-400"
                    >
                      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardHeader>

            <div className="mt-8">
              <AddBtn productId={singleProduct._id} />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
