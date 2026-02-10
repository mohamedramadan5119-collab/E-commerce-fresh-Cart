'use client'
import React, { useState } from 'react';
import { useWishlist } from "@/hooks/useWishlist";
import ProductCard from "../_componants/productCard/productCard";
import { Trash2 } from "lucide-react"; // لو مستخدم lucide-react للأيقونات

export default function WishlistPage() {
  const { wishlistQuery, removeMutate } = useWishlist();
  const [isClearing, setIsClearing] = useState(false);

  // دالة لمسح كل المنتجات
  const handleClearAll = async () => {
    if (!wishlistQuery.data || wishlistQuery.data.length === 0) return;
    
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
      setIsClearing(true);
      // بنمشي على كل منتج ونبعت طلب مسح
      // ملاحظة: لو الـ API بتاعك فيه endpoint لمسح الكل مباشرة يكون أفضل
      const promises = wishlistQuery.data.map((prod: any) => 
        removeMutate.mutateAsync(prod._id)
      );
      
      try {
        await Promise.all(promises);
      } catch (error) {
        console.error("Error clearing wishlist:", error);
      } finally {
        setIsClearing(false);
      }
    }
  };

  if (wishlistQuery.isLoading) {
    return (
      <div className="p-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0aad0a]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen">
      <div className="flex justify-between items-center mb-8  pb-4">
        <h1 className="text-3xl font-bold text-[#0aad0a]">My Wishlist </h1>
        

        {wishlistQuery.data && wishlistQuery.data.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={isClearing}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 font-medium disabled:opacity-50"
          >
            {isClearing ? "Clearing..." : (
              <>
                <Trash2 size={18} />
                Clear All
              </>
            )}
          </button>
        )}
      </div>
      
      {wishlistQuery.data && wishlistQuery.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlistQuery.data.map((prod: any) => (
            <div key={prod._id}>
               <ProductCard prod={prod} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-xl mb-4">Your wishlist is empty yet!</p>
          <a href="/products" className="text-[#0aad0a] font-semibold hover:underline">
            Go shopping now
          </a>
        </div>
      )}
    </div>
  );
}