
"use server"
import { getAccessToken } from "@/schema/accesstoken";


export async function deleteCartItem(productId:string){

const token=await getAccessToken()


    if(!token){
        throw new  Error('unauthenticated')
    }
    const response =await fetch(`${process.env.API}/cart/${productId}` , {
        method:'DELETE',
        headers:{
            token:token,
            'Content-type':' application/json'
        }
    })
    const payload = await response.json()
    console.log(payload);
    return payload
    
}

