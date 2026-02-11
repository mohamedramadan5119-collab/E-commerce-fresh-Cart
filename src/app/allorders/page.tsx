"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ShoppingBag,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface OrderItem {
  count: number;
  price: number;
  product: {
    title: string;
    imageCover: string;
  };
}

interface Order {
  _id: string;
  totalOrderPrice: number;
  isPaid: boolean;
  createdAt: string;
  cartItems: OrderItem[];
  shippingAddress?: {
    city: string;
  };
}

export default function AllOrders() {
  const { data: session } = useSession();

  const userId = (session?.user as { id?: string })?.id;

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["user-orders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch orders");
      const result = await response.json();
      return result;
    },
    enabled: !!userId,
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#f8f9fa] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#0aad0a]"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Loading your orders...
        </p>
      </div>
    );

  if (isError || !orders || orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-500  px-4 text-center">
        <div className="bg-white p-8 rounded-full shadow-sm mb-6">
          <ShoppingBag size={80} className="text-gray-200" />
        </div>
        <p className="text-2xl font-bold text-gray-800">No orders found yet</p>
        <p className="text-sm mt-2 max-w-xs">
          Your shopping history is empty. Start exploring our products and make
          your first order!
        </p>
      </div>
    );

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#0aad0a] p-3 rounded-2xl text-white shadow-lg shadow-green-100">
            <Package size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Order History
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and track your recent purchases
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                      Order Ref
                    </p>
                    <p className="text-sm font-mono font-bold text-gray-700 bg-white px-2 py-1 rounded-md border border-gray-100">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                      Placed On
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
                      <Calendar size={14} className="text-[#0aad0a]" />
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-bold ${order.isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {order.isPaid ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    {order.isPaid ? "PAID" : "PENDING"}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Total Amount
                    </p>
                    <p className="text-xl font-black text-[#0aad0a]">
                      {order.totalOrderPrice.toLocaleString()}{" "}
                      <span className="text-xs">EGP</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* المنتجات */}
              <div className="p-6 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {order.cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 rounded-2xl border border-gray-50 bg-[#fbfbfb] hover:bg-white hover:border-[#0aad0a]/20 transition-all duration-200 group"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 p-1">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-1">
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1">
                          {item.product.title}
                        </h4>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Qty:{" "}
                            <span className="text-gray-900 font-bold">
                              {item.count}
                            </span>
                          </p>
                          <p className="text-sm font-bold text-gray-700">
                            {item.price}{" "}
                            <span className="text-[10px]">EGP</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer بسيط */}
              <div className="px-6 py-3 bg-gray-50/50 flex justify-between items-center text-[11px] text-gray-400 font-medium">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>
                    Delivering to:{" "}
                    {order.shippingAddress?.city || "Default Address"}
                  </span>
                </div>
                <span>Fresh Cart Secure Order</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
