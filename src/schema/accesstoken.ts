import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route"; // تأكد من مسار الـ route بتاعك

export async function getAccessToken() {
    // دي بتعرف تجيب الكوكيز سواء إنت في localhost أو فيرسيل لوحدها
    const session = await getServerSession(authOptions);

    if (session && session.token) {
        return session.token;
    }

    return null;
}