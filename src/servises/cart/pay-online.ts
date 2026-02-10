"use server"
import { shipping } from "@/app/types/cart-response";
import { getAccessToken } from "@/schema/accesstoken";


export async function payOnlineOrder(carttId:string , shippingAddress:shipping){

const token=await getAccessToken()


    if(!token){
        throw new  Error('unauthenticated')
    }
    const response =await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${carttId}?url=http://localhost:3000` , {
        method:'post',
        headers:{
            token:token,
            'Content-type':' application/json'
        },
        body:JSON.stringify({
            shippingAddress
        })
    })
    const payload = await response.json()
    console.log(payload);
    return payload
    
}

