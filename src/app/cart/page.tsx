"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CartResponse } from "../types/cart-response";
import Image from "next/image";
import { deleteCartItem } from "@/servises/cart/delete-cart-item";
import toast from "react-hot-toast";
import { updateCartItem } from "@/servises/cart/update-cart-item";
import { useSession } from "next-auth/react";
import cartImage from "../../aassets/images/Empty-cart.svg";
import Link from "next/link";
import Loading from "../loading";
import error from '../../aassets/images/404.bcc156d7c71a6cc7b8c0.png'

export default function Cart() {
  const queryClient = useQueryClient();
  const {
    data: cartData,
    isLoading,
    isError,
  } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");

      const payload = await response.json();
      return payload;
    },
  });

  const { status, data: session } = useSession();
  console.log(status);

  //delete cart item
  const { mutate: delCartItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success("product deleted");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: () => {
      toast.error("Error");
    },
  });

  //delete cart item

  const { mutate: updCartItem, isPending: updateLoading } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      toast.success("product updated");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: () => {
      toast.error("Error");
    },
  });

  // Clear All Cart Items
  const { mutate: clearCart, isPending: isClearing } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Cart cleared successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: () => {
      toast.error("Failed to clear cart");
    },
  });

  function handelUpdate(productId: string, count: number) {
    updCartItem({ productId, count });
  }

  async function handleCheckout(cartId: string) {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        headers: {
          token: (session?.user as any)?.token,
        },
      },
    );

    const data = await response.json();
    if (data.status === "success") {
      window.location.href = data.session.url;
    }
  }

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div className="contaner">
      <div className="w-full h-screen flex justify-center items-center">
        <Image className="w-full" src={error}  alt="404"></Image>
      </div>
    </div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-primary mt-5">My Cart</h1>
      {cartData?.numOfCartItems > 0 ? (
        <div className="flex flex-col  md:flex-row  gap-5">
          <div className="w-full order-2 md:w-3/4 md:order-1">
            <div className="relative mt-5 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="hidden md:table-header-group text-sm bg-primary text-white text-center">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="block md:table-row-group">
                  {cartData?.data.products.map((prod) => (
                    <tr
                      key={prod._id}
                      className="block md:table-row bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="block md:table-cell p-4">
                        <div className="flex justify-center">
                          <Image
                            src={prod.product.imageCover}
                            width={100}
                            height={100}
                            className="w-20 md:w-24 rounded-lg object-cover"
                            alt={prod.product.title}
                          />
                        </div>
                      </td>

                      <td className="block md:table-cell px-6 py-2 md:py-4 text-center md:text-left font-bold text-gray-800 md:w-1/3">
                        <span className="md:hidden text-gray-400 block text-xs uppercase mb-1">
                          Product:
                        </span>
                        {prod.product.title}
                      </td>
                      <td className="block md:table-cell px-6 py-2 md:py-4">
                        <span className="md:hidden text-gray-400 block text-xs uppercase mb-1 text-center font-bold">
                          Quantity:
                        </span>
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() =>
                              handelUpdate(prod.product._id, prod.count - 1)
                            }
                            className="flex items-center justify-center border border-gray-200 hover:border-primary hover:text-primary rounded-full h-8 w-8 transition-all"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M18 12H6"
                              />
                            </svg>
                          </button>
                          <span className="font-bold text-gray-800 min-w-[20px] text-center">
                            {prod.count}
                          </span>
                          <button
                            onClick={() =>
                              handelUpdate(prod.product._id, prod.count + 1)
                            }
                            className="flex items-center justify-center border border-gray-200 hover:border-primary hover:text-primary rounded-full h-8 w-8 transition-all"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M12 6v12m6-6H6"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>

                      <td className="block md:table-cell px-6 py-2 md:py-4 text-center">
                        <span className="md:hidden text-gray-400 block text-xs uppercase mb-1 font-bold">
                          Price:
                        </span>
                        <span className="text-primary font-bold text-lg">
                          {prod.price} EGP
                        </span>
                      </td>

                      <td className="block md:table-cell px-6 py-4 text-center">
                        <button
                          onClick={() => delCartItem(prod.product._id)}
                          className="text-red-500 hover:bg-red-500 hover:text-white cursor-pointer px-4 py-2 rounded-xl border border-red-100 md:border-none transition-all text-sm font-bold"
                        >
                          <i className="fa-solid fa-trash-can mr-2 md:hidden"></i>{" "}
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full order-1 md:w-1/4 md:order-2  flex flex-col   items-center gap-10">
            <div className=" ">
              <h2 className="mt-5 font-semibold ">
                Welcome
                <span className="text-primary font-bold text-[20px] p-1">
                  {session?.user?.name}
                </span>
                to your Cart
              </h2>
              <Image
                className="mt-5 m-auto contrast-[1.1] brightness-[1.05]"
                style={{ mixBlendMode: "multiply" }}
                src={cartImage}
                width={200}
                height={200}
                alt=""
              />
            </div>

            <div className="border-2 w-full rounded-2xl  border-primary p-5 mt-10">
              <h2 className="text-center font-bold text-2xl pb-2">Orders</h2>
              <h3>
                products{" "}
                <span className="text-primary">
                  {cartData?.data.products.length} items
                </span>
              </h3>
              <h3 className="pt-3">
                Total Price :{" "}
                <span className="text-primary ">
                  {cartData?.data.totalCartPrice} EGP
                </span>
              </h3>

              <div className="pt-5 flex flex-col items-center justify-center gap-1 w-full py-4">
                <button className="px-4 py-2  outline outline-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all disabled:bg-gray-400 disabled:cursor-not-allowed mb-4 flex items-center gap-2">
                  <Link href={`/checkout/${cartData?.cartId}`}>Check out</Link>
                </button>
                <button
                  onClick={() => clearCart()}
                  disabled={isClearing || !cartData?.data.products.length}
                  className="px-4 py-2  outline outline-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all disabled:bg-gray-400 disabled:cursor-not-allowed mb-4 flex items-center gap-2"
                >
                  {isClearing ? (
                    "Clearing..."
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Clear All Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="flex justify-center items-center ">
            <Image src={cartImage} width={500} height={500} alt="image" />
          </div>
        </div>
      )}
    </>
  );
}
