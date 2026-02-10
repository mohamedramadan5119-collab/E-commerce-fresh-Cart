'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { addToCart } from '@/servises/cart/addproducttocart'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'

export default function AddBtn({productId}:{productId:string}) {
    const queryClient= useQueryClient()
    // addToCart
    const{data , isPending , error , isError ,mutate:addProductToCart}= useMutation({
        mutationFn:addToCart,
        onSuccess:(data)=>{
            toast.success(data?.message)
            queryClient.invalidateQueries({queryKey:['get-cart']})
        },
        onError:()=>{
            toast.error('Login First')
        }
    })
    
  return (
    <>
        <CardFooter>
            <div className="flex justify-between items-center w-full">
                <Button onClick={()=>{addProductToCart(productId)}}  className=" cursor-pointer">Add to cart</Button>
                
            </div>

        </CardFooter>
    </>
  )
}
