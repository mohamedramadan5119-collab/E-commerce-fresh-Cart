import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { failedLogin, successLogin } from "./app/types/authinterface";

export const authOptions:NextAuthOptions ={
    pages:{
        signIn:'/login'
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email:{},
                password:{},
            },
            authorize: async (credentials) => {

                const response = await fetch(`${process.env.API}/auth/signin` , {
                    method:'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                }),
                    headers: {
                        "Content-Type": "application/json",
                    }
            })
            const payload :failedLogin | successLogin = await response.json();

            if('token' in payload){
                return {
                    id: payload.user.email,
                    user: payload.user ,
                    token: payload.token ,
                    
                }
                
                
            }else{
                throw new Error('Error.....')
            }




                
            }
        })
    ],
        callbacks: {
            jwt: async ({ token, user }) => {
                if (user) {
                    token.user = (user as any).user;
                    token.userId = (user as any).user._id; 
                    token.token = (user as any).token;
                }
                return token;
            },
            session: async ({ session, token }) => {
                if (session.user) {
                    (session.user as any)._id = token.userId;
                    session.user = token.user as any;
                    (session as any).token = token.token;
                }
                return session;
            }
        }
}



const API_URL = process.env.API || "https://ecommerce.routemisr.com/api/v1";
export async function forgotPasswordAction(email: string) {
    const response = await fetch(`${API_URL}/auth/forgotPasswords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    return await response.json();
}

export async function verifyCodeAction(resetCode: string) {
    const response = await fetch(`${API_URL}/auth/verifyResetCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            resetCode: resetCode.trim()
        }),
    });
    return await response.json();
}

export async function resetPasswordAction(data: any) {
    const response = await fetch(`${API_URL}/auth/resetPassword`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return await response.json();
}

export async function updateLoggedPasswordAction(data: any, token: string) {
    const response = await fetch(`${API_URL}/users/changeMyPassword`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'token': token 
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}