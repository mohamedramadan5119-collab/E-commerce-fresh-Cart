"use server"
import { getAccessToken } from "../../schema/accesstoken";
import { redirect } from "next/navigation";

export async function addToCart(productId: string) {
    const token = await getAccessToken();

    if (!token) {
        redirect("/login"); 
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