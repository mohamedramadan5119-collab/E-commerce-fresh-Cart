'use client'
import React from 'react'
import { User, Mail, Phone, MapPin, Settings, ShoppingBag, Heart } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session } = useSession()

  const user = {
    name: session?.user?.name || "User Name",
    email: session?.user?.email || "user@example.com",
    phone: "Not Provided",
    address: "Cairo, Egypt",
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-[#0aad0a] mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Side Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm p-8 text-center border border-gray-100">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full bg-green-50 flex items-center justify-center text-[#0aad0a] text-4xl font-bold border-2 border-[#0aad0a]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 hover:text-[#0aad0a] transition-colors">
                  <Settings size={18} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm mb-8">{user.email}</p>
              
              <div className="flex justify-around border-t border-gray-50 pt-6">
                <Link href="/allorders" className="flex flex-col items-center group cursor-pointer">
                  <div className="p-3 rounded-2xl group-hover:bg-green-50 transition-colors">
                    <ShoppingBag className="text-gray-400 group-hover:text-[#0aad0a]" />
                  </div>
                  <span className="text-xs text-gray-500 font-bold mt-1">Orders</span>
                </Link>

                <Link href="/wishlist" className="flex flex-col items-center group cursor-pointer">
                  <div className="p-3 rounded-2xl group-hover:bg-red-50 transition-colors">
                    <Heart className="text-gray-400 group-hover:text-red-500" />
                  </div>
                  <span className="text-xs text-gray-500 font-bold mt-1">Wishlist</span>
                </Link>
              </div>
            </div>
          </div>


          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-bold text-gray-800">Account Information</h3>
                <button className="text-[#0aad0a] text-sm font-bold hover:underline uppercase tracking-wider">Edit Details</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: User, label: "Full Name", value: user.name },
                  { icon: Mail, label: "Email Address", value: user.email },
                  { icon: Phone, label: "Phone Number", value: user.phone },
                  { icon: MapPin, label: "Primary Address", value: user.address },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-[#f8f9fa] rounded-2xl border border-transparent hover:border-green-100 transition-all">
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                      <item.icon className="text-[#0aad0a]" size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Security & Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="text-left p-5 border border-gray-50 rounded-2xl bg-[#f8f9fa] hover:bg-white hover:shadow-md transition-all group">
                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#0aad0a]">Change Password</p>
                  <p className="text-xs text-gray-500 mt-1">Keep your account secure</p>
                </button>
                <button 
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="text-left p-5 border border-red-50 rounded-2xl bg-red-50/20 hover:bg-red-50 transition-all group"
                >
                  <p className="text-sm font-bold text-red-600">Logout</p>
                  <p className="text-xs text-red-400 mt-1">Sign out from this device</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}