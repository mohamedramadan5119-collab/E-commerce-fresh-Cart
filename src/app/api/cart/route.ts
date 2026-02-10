import { error } from "console";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req:NextRequest){
    const token= await getToken({req})

    if(!token){
        return NextResponse.json({
            error:('unAuthorized') ,
            satus:401
        })
    }

    const request= await fetch(`${process.env.API}/cart` , {
        headers:{
            token:token.token , 
            'Content-type':'application/json'
        }
    })


    const payload= await request.json()


    return NextResponse.json(payload)

}

export async function DELETE(req: NextRequest) {
    const token = await getToken({ req });
    
    const res = await fetch(`${process.env.API}/cart`, {
        method: 'DELETE',
        headers: {
            token: token?.token as string,
        }
    });

    const data = await res.json();
    return NextResponse.json(data);
}