"use server"
import { getAccessToken } from "@/schema/accesstoken";
import { redirect } from "next/navigation"; // استيراد دالة التحويل

export async function addToCart(productId: string) {
    const token = await getAccessToken();

    // إذا لم يوجد توكن، يتم تحويل المستخدم مباشرة لصفحة الـ Login
    if (!token) {
        redirect("/login"); 
        // ملاحظة: دالة redirect في Server Actions تعمل عن طريق إلقاء Error خاص 
        // لذا يجب أن تكون خارج بلوك الـ try/catch أو يتم التعامل معها بحذر
    }

    const baseUrl = process.env.API || "https://ecommerce.routemisr.com/api/v1";

    try {
        const response = await fetch(`${baseUrl}/cart`, {
            method: 'POST', 
            headers: {
                "token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        });

        return await response.json();
    } catch (error) {
        console.error("Fetch Error:", error);
        return { status: "error", message: "Server Error" };
    }
}