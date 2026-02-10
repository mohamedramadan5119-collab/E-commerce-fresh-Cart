'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { payCashOrder } from '@/servises/cart/pay-cash'
import { shipping } from '@/app/types/cart-response'
import { payOnlineOrder } from '@/servises/cart/pay-online'
 


export default function CheckoutForm({cartId}:{cartId:string}) {
    const [isOnline, setisOnline] = useState(true)



   async function payCash(cartId:string , shippingAddress:shipping){
        const response = await payCashOrder(cartId , shippingAddress)
        console.log(response);
        if(response.status=='success'){
            toast.success('order will delived soon')
            window.location.href='/'
        }else{
            toast.error('error')

        }
        
    }


    async function payOnline(cartId:string , shippingAddress:shipping){
        const response = await payOnlineOrder(cartId , shippingAddress)
        console.log(response);
        if(response.status=='success'){
            toast.success('order will delived soon')
            window.location.href=response.session.url
        }else{
            toast.error('error')

        }
        
    }
    


  
  const [isLoading, setisLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      details: "",
        phone: "",
        city: ""
    }
  })

async  function onSubmit(values:shipping) {
    setisLoading(true)
    console.log(values);
    const shippingAddress={
        ...values

    }

    if(isOnline){
        payOnline(cartId , shippingAddress)
    }else{
        payCash(cartId , shippingAddress)
    }
    
    
    
    
    
    
    setisLoading(false)
    
  }




  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl mt-20 bg-gray-200 shadow-lg">
      <h2 className='text-green-500 font-bold text-3xl mb-6'>Checkout Now</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>details</FormLabel>
                <FormControl>
                  <Input 
                    className='bg-white' 
                    type="text" 
                    placeholder="Enter your details" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>city</FormLabel>
                <FormControl>
                  <Input 
                    className='bg-white' 
                    type="text" 
                    placeholder="Enter your city" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>phone</FormLabel>
                <FormControl>
                  <Input 
                    className='bg-white' 
                    type="text" 
                    placeholder="Enter your phone" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
          onClick={()=>{setisOnline(false)}}
          disabled={isLoading}
            type='submit' 
            className='w-full cursor-pointer' 
          >
            {isLoading? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>:'pay Cash'}
            

          </Button>

          
          <Button 
          onClick={()=>{setisOnline(true)}}
          disabled={isLoading}
            type='submit' 
            className='w-full cursor-pointer' 
          >
            {isLoading? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>:'pay Online'}
            

          </Button>

          <p className='text-center text-sm mt-4'>
            Don't have an account?{' '}
            <Link href="/register" className='text-green-500 font-semibold hover:underline'>
              Register
            </Link>
          </p>
        </form>
      </Form>
    </div>
  )
}




  
