'use client'
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, Package, Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react'; 

export default function AllOrders() {
  const { data: session } = useSession();
  
  const userId = session?.user?.id; 

  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['user-orders', userId],
    queryFn: async () => {
      if (!userId) return []; 
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    },
    enabled: !!userId, 
  });

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0aad0a]"></div>
    </div>
  );

  if (isError || !orders || orders.length === 0) return (
    <div className="min-h-screen flex flex-col justify-center items-center text-gray-500">
      <ShoppingBag size={64} className="mb-4 text-gray-300" />
      <p className="text-xl font-bold">No orders found yet.</p>
      <p className="text-sm">When you buy something, it will appear here.</p>
    </div>
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#0aad0a] p-2 rounded-lg text-white">
            <Package size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        </div>

        <div className="space-y-6">
          {orders.map((order: any) => (
            <div key={order._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order ID</p>
                    <p className="text-sm font-mono text-gray-700">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Date</p>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase ${order.isPaid ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                    {order.isPaid ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </div>
                  <p className="text-lg font-black text-[#0aad0a]">{order.totalOrderPrice} EGP</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.cartItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 p-3 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                        <Image 
                          src={item.product.imageCover} 
                          alt={item.product.title} 
                          fill 
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.product.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">Qty: <span className="text-gray-600 font-bold">{item.count}</span> × {item.price} EGP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}