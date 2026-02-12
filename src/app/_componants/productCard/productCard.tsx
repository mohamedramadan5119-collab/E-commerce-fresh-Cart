"use client";
import React, { useState, useEffect } from "react";
import { ProductItem } from "../../types/productinterface";
import { Card } from "../../../components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddBtn from "../addBtn/addbtn";
import { useWishlist } from "../../../hooks/useWishlist";

export default function ProductCard({ prod }: { prod: ProductItem }) {
  const { wishlistQuery, addMutate, removeMutate } = useWishlist();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isFav =
    mounted && wishlistQuery.data?.some((item: any) => item._id === prod._id);
  const isPending = addMutate.isPending || removeMutate.isPending;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      removeMutate.mutate(prod._id);
    } else {
      addMutate.mutate(prod._id);
    }
  };

  return (
    <Card className="relative overflow-hidden mx-auto w-full max-w-sm pt-0 group hover:shadow-lg transition-all duration-300 border-none bg-white">
      {prod.ratingsAverage > 4.5 && (
        <div className="absolute top-4 left-4 z-20 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
          Top Rated
        </div>
      )}
      <button
        onClick={toggleWishlist}
        disabled={isPending}
        className="absolute top-2 right-2 z-20 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFav ? "#0aad0a" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={isFav ? "#0aad0a" : "currentColor"}
          className={`size-5 transition-all duration-300 ${isFav ? "scale-110" : ""}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>

      <Link href={`/productdetails/${prod._id}`} className="block">
        <Image
          src={prod.imageCover}
          alt={prod.title}
          width={200}
          height={250}
          style={{ height: "auto" }}
          className="w-full h-48 object-contain mt-2 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="p-3">
          <p className="text-primary text-[20px] font-medium mb-1">
            {prod.category.name}
          </p>
          <h3 className="font-semibold text-sm truncate text-gray-800 mb-2">
            {prod.title.split(" ").slice(0, 2).join(" ")}
          </h3>
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-gray-900">{prod.price} EGP</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-gray-500 font-medium">
                {prod.ratingsAverage}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3 flex items-center gap-2">
        <div className="flex-grow">
          <AddBtn productId={prod._id} />
        </div>
      </div>
    </Card>
  );
}
