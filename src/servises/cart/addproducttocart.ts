"use server"
import { getAccessToken } from "@/schema/accesstoken";


export async function addToCart(productId:string){

const token=await getAccessToken()


    if(!token){
        throw new  Error('unauthenticated')
    }
    const response =await fetch(`${process.env.API}/cart` , {
        cache:'no-store',
        method:'post',
        headers: {
            "Token": token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            productId
        })
    })
    const payload = await response.json()
    console.log(payload);
    return payload
    
}

