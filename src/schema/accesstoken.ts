import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getAccessToken(){
    const cookieStore = await cookies();
    
    const authToken = cookieStore.get('__Secure-next-auth.session-token')?.value 
                     || cookieStore.get('next-auth.session-token')?.value;

    if (!authToken) return null;

    try {
        const tokenData = await decode({
            token: authToken, 
            secret: process.env.NEXTAUTH_SECRET || "default_secret_for_types" 
        });
        
        return (tokenData as any)?.token || null;
    } catch (err) {
        console.error("Decode Error:", err);
        return null;
    }
}