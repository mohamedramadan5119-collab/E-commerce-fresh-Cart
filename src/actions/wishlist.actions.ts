"use server"
import { getAccessToken } from "@/schema/accesstoken";

const API_BASE = "https://ecommerce.routemisr.com/api/v1";

// 1. جلب البيانات
export async function getWishlist() {
    const token = await getAccessToken();
    if (!token) return { status: "fail", message: "Unauthenticated" };

    const response = await fetch(`${API_BASE}/wishlist`, {
        method: 'GET',
        headers: { 'token': token },
        next: { revalidate: 0 } // عشان الداتا متتكيش وتظهر قديمة
    });
    return await response.json();
}

// 2. إضافة منتج
export async function addToWishlist(productId: string) {
    const token = await getAccessToken();
    const response = await fetch(`${API_BASE}/wishlist`, {
        method: 'POST',
        headers: { 'token': token || "", 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
    });
    return await response.json();
}

// 3. حذف منتج
export async function removeFromWishlist(productId: string) {
    const token = await getAccessToken();
    const response = await fetch(`${API_BASE}/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { 'token': token || "" }
    });
    return await response.json();
}