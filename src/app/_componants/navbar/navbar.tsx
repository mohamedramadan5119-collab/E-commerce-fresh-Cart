"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuBasic } from "../dropDown/DropDown";
import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "@/app/types/cart-response";
import { useWishlist } from "@/hooks/useWishlist";
import logo from "../../../aassets/images/logo2.jpg";

export default function Navbar() {
  const { status, data: session } = useSession();
  const activeLink = usePathname();
  const [isOpen, setisOpen] = useState(false);

  const { wishlistQuery } = useWishlist();
  const wishlistCount = wishlistQuery.data?.length || 0;

  const { data: cartData } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");
      return await response.json();
    },
    enabled: status === "authenticated",
  });

  function toggleMenu() {
    setisOpen(!isOpen);
  }

  function Logout() {
    signOut({ callbackUrl: "/login" });
  }

  const path = [
    { href: "/", content: "Home" },
    { href: "/products", content: "Products" },
    { href: "/category", content: "Category" },
    { href: "/brands", content: "Brands" },
  ];

  const authPath = [
    { href: "/login", content: "Login" },
    { href: "/register", content: "Register" },
  ];

  return (
    <nav className="bg-gray-200 py-2 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          onClick={() => setisOpen(false)}
          className="flex items-center space-x-3 rtl:space-x-reverse z-50"
        >
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={20}
            className="rounded-full mix-blend-multiply"
          />
          <span className="self-center text-xl font-bold whitespace-nowrap text-green-600">
            Fresh Cart
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-2 md:space-x-4 rtl:space-x-reverse z-50">
          {status === "authenticated" && (
            <div className="flex items-center space-x-3 md:space-x-5">
              <Link
                href="/wishlist"
                className="relative text-gray-600 hover:text-red-500 transition-all"
              >
                {wishlistCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border border-white p-0">
                    {wishlistCount}
                  </Badge>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </Link>

              <Link
                href="/cart"
                className="relative text-gray-600 hover:text-green-600 transition-all"
              >
                {cartData && cartData.numOfCartItems > 0 && (
                  <Badge className="absolute -right-2 -top-2 bg-green-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border border-white p-0">
                    {cartData.numOfCartItems}
                  </Badge>
                )}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </Link>
              <DropdownMenuBasic logout={Logout} />
            </div>
          )}

          <button
            onClick={toggleMenu}
            type="button"
            className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:items-center md:justify-between flex-grow md:ml-10`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {path.map((elem) => (
              <li key={elem.content}>
                <Link
                  href={elem.href}
                  onClick={() => setisOpen(false)}
                  className={`${activeLink === elem.href ? "text-green-600 font-bold" : "text-gray-700"} block py-2 px-3 hover:text-green-600 transition-colors`}
                >
                  {elem.content}
                </Link>
              </li>
            ))}

            {status !== "authenticated" &&
              authPath.map((elem) => (
                <li key={elem.content} className="md:hidden">
                  <Link
                    href={elem.href}
                    onClick={() => setisOpen(false)}
                    className="block py-2 px-3 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {elem.content}
                  </Link>
                </li>
              ))}
          </ul>

          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse ml-auto">
            {status === "authenticated" ? (
              <span className="text-gray-700 text-md me-5">
                HI,{" "}
                <span className="text-green-600 text-[18px] font-bold uppercase">
                  {session?.user?.name}
                </span>
              </span>
            ) : (
              <div className="flex space-x-4">
                {authPath.map((elem) => (
                  <Link
                    key={elem.content}
                    href={elem.href}
                    className="text-gray-700 hover:text-green-600 font-medium"
                  >
                    {elem.content}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
