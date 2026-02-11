"use server"
import { getAccessToken } from "@/schema/accesstoken";

export async function addToCart(productId: string) {

    const token = await getAccessToken();


    if (!token) {
        console.log("No Token Found!");
        return { message: "unauthenticated", status: "error" };
    }

    const baseUrl = process.env.API || "https://ecommerce.routemisr.com/api/v1";

    try {
        const response = await fetch(`${baseUrl}/cart`, {
            method: 'POST', 
            headers: {
                "Token": token, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        });

        const payload = await response.json();
        
        console.log("API Response Payload:", payload); 

        return payload;
    } catch (error) {
        console.error("Fetch Error:", error);
        return { message: "Server Error", error };
    }
}