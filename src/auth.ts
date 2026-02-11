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
                // الـ user ده بيملي البيانات أول ما بتعمل Login بس
                if (user) {
                    token.user = (user as any).user;
                    // هنا بنسحب الـ _id من بيانات اليوزر اللي راجعة من الـ API ونخزنه في التوكن
                    token.userId = (user as any).user._id; 
                    token.token = (user as any).token;
                }
                return token;
            },
            session: async ({ session, token }) => {
                // هنا بننقل الـ userId من التوكن للسيشن عشان الصفحة تقدر تشوفه
                if (session.user) {
                    (session.user as any)._id = token.userId;
                    session.user = token.user as any;
                }
                return session;
            }
        }
}


// ضيف دول تحت خالص في نفس الملف src/servises/auth.ts

const API_URL = process.env.API || "https://ecommerce.routemisr.com/api/v1";

// 1. دالة طلب كود التحقق
export async function forgotPasswordAction(email: string) {
    const response = await fetch(`${API_URL}/auth/forgotPasswords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
    return await response.json();
}

// 2. دالة التأكد من الكود
export async function verifyCodeAction(resetCode: string) {
    // تأكد أن الكود المرسل نصي وليس به مسافات
    const response = await fetch(`${API_URL}/auth/verifyResetCode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            resetCode: resetCode.trim() // مسح أي مسافات بالخطأ
        }),
    });
    return await response.json();
}

// 3. دالة تعيين الباسورد الجديد
export async function resetPasswordAction(data: any) {
    const response = await fetch(`${API_URL}/auth/resetPassword`, {
        method: 'PUT', // الـ API ده بيستخدم PUT
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
            'token': token // هنا لازم نبعت التوكن بتاع المستخدم
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}