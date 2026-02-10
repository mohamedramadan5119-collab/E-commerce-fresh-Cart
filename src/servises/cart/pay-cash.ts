"use server"
import { shipping } from "@/app/types/cart-response";
import { getAccessToken } from "@/schema/accesstoken";


export async function payCashOrder(carttId:string , shippingAddress:shipping){

const token=await getAccessToken()


    if(!token){
        throw new  Error('unauthenticated')
    }
    const response =await fetch(`${process.env.API}/orders/${carttId}` , {
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

