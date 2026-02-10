
"use server"
import { getAccessToken } from "@/schema/accesstoken";
import { count } from "console";


export async function updateCartItem({productId , count}:{productId:string , count:number}){

const token=await getAccessToken()


    if(!token){
        throw new  Error('unauthenticated')
    }
    const response =await fetch(`${process.env.API}/cart/${productId}` , {
        method:'PUT',
        headers:{
            token:token,
            'Content-type':' application/json'
        },
        body:JSON.stringify({
            count:count
        })
    })
    const payload = await response.json()
    console.log(payload);
    return payload
    
}


