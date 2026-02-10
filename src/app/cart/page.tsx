'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { CartResponse } from '../types/cart-response'
import Image from 'next/image'
import { deleteCartItem } from '@/servises/cart/delete-cart-item'
import toast from 'react-hot-toast'
import { updateCartItem } from '@/servises/cart/update-cart-item'
import { useSession } from 'next-auth/react'
import cartImage from '../../aassets/images/cartImage.jpg'
import Link from 'next/link'

export default function Cart() {
  const queryClient= useQueryClient()
const {data:cartData , isLoading , isError}= useQuery<CartResponse>({
  queryKey:['get-cart'],
  queryFn:async()=>{
    const response= await fetch('/api/cart')

    const payload = await response.json()
    return payload
  }
})

const {status , data :session}= useSession()
  console.log(status);

//delete cart item
const {mutate:delCartItem  }= useMutation({
  mutationFn:deleteCartItem,
  onSuccess:()=>{
    toast.success('product deleted')
    queryClient.invalidateQueries({
      queryKey:['get-cart'] 
    })
  },
  onError:()=>{
    toast.error('Error')
  }
})


//delete cart item

const {mutate:updCartItem  , isPending:updateLoading}= useMutation({
  mutationFn:updateCartItem,
  onSuccess:()=>{
    toast.success('product updated')
    queryClient.invalidateQueries({
      queryKey:['get-cart'] 
    })
  },
  onError:()=>{
    toast.error('Error')
  }
})

// Clear All Cart Items
const { mutate: clearCart, isPending: isClearing } = useMutation({
  mutationFn: async () => {
    const response = await fetch('/api/cart', {
      method: 'DELETE',
    });
    return response.json();
  },
  onSuccess: () => {
    toast.success('Cart cleared successfully');
    queryClient.invalidateQueries({
      queryKey: ['get-cart'] 
    });
  },
  onError: () => {
    toast.error('Failed to clear cart');
  }
});


function handelUpdate(productId:string , count:number){
  updCartItem({productId ,count})
}



if(isLoading){
  return <h2>Loading...</h2>
}

if(isError){
  return <h2>Error...</h2>
}

  return (
    <>
        {cartData?.numOfCartItems > 0 ? <div className="flex flex-col  md:flex-row  gap-5">
      <div className="w-full order-2 md:w-3/4 md:order-1  ">
          <div className="relative mt-5 rounded-2xl overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full  text-sm text-left rtl:text-right text-body">
              <thead className="text-sm bg-primary text-white  text-center bg-neutral-secondary-medium border-b border-default-medium">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='text-center '>
                {cartData?.data.products.map((prod)=>{return <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                  <td className="p-4 flex justify-center">
                    <Image src={prod.product.imageCover} width={100} height={100} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading  w-1/3"> 
                    {prod.product.title}
                  </td>
                  <td className="px-6 py-4 ">
                    <form className="max-w-xs mx-auto">
                      <label htmlFor="counter-input-1" className="sr-only">Choose quantity:</label>
                      <div className="relative flex items-center justify-center text-primary ">
                        <button onClick={()=>{handelUpdate(prod.product._id , prod.count-1)}} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                          <svg className=" cursor-pointer w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
                        </button>
                        <span  id="counter-input-1" data-input-counter className="mx-3 shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"  >
                            {prod.count}
                        </span>
                        <button onClick={()=>{handelUpdate(prod.product._id , prod.count+1)}} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                          <svg className=" cursor-pointer w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
                        </button>
                      </div>
                    </form>
                  </td>
                  <td className="px-6 py-4 font-semibold text-heading text-primary text-[20px]">
                    {prod.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span  onClick={()=>{delCartItem(prod.product._id)}} 
                    className="outline-1 outline-red-500 p-1 rounded-[10px] cursor-pointer hover:bg-red-500 text-red-400 font-medium text-fg-danger text-[20px] hover:text-white">Remove</span>
                  </td>
                </tr>})}
                

              </tbody>
            </table>
          </div>
      </div>

      <div className="w-full order-1 md:w-1/4 md:order-2  flex flex-col   items-center gap-10">
        <div className=' '>
          <h2  className='mt-5 font-semibold '>Welcome 
        <span className='text-primary font-bold text-[20px] p-1'>{session?.user?.name}</span>
         to your Cart
         </h2>
      <Image 
        className="mt-5 m-auto contrast-[1.1] brightness-[1.05]" 
        style={{ mixBlendMode: 'multiply' }}
        src={cartImage} width={200} height={200} alt="" 
      />
        </div>

        <div className='border-2 w-full rounded-2xl  border-primary p-5 mt-10'>
            <h2 className='text-center font-bold text-2xl pb-2'>Orders</h2>
            <h3>products <span className='text-primary'>{cartData?.data.products.length} items</span></h3>
            <h3 className='pt-3'>Total Price : <span className='text-primary '>{cartData?.data.totalCartPrice} EGP</span></h3>

            <div className='pt-5 flex flex-col items-center justify-center gap-1 w-full py-4'>
              <button 
              
              className="px-4 py-2  outline outline-primary text-primary rounded-md hover:bg-primary hover:text-white transition-all disabled:bg-gray-400 disabled:cursor-not-allowed mb-4 flex items-center gap-2">
                <Link href={`/checkout/${cartData?.cartId}`}>Check out</Link>
                  
                
              
            </button>
              <button 
              onClick={() => clearCart()} 
              disabled={isClearing || !cartData?.data.products.length}
              className="px-4 py-2  outline outline-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-all disabled:bg-gray-400 disabled:cursor-not-allowed mb-4 flex items-center gap-2"
            >
              {isClearing ? 'Clearing...' : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear All Cart
                </>
              )}
            </button>
            </div>
        </div>
          
      </div>
    </div> : <Image src={cartImage} width={500} height={500} alt='image'/>}
    




    </>
  )
}
