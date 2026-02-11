"use client";
import { useState } from "react";
import { verifyCodeAction } from "@/auth"; 
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    console.log("Sending Code:", code); 

    const res = await verifyCodeAction(code);

    if (res.status === "Success") {
      toast.success("Code Verified Successfully!");
      router.push("/reset-password"); 
    } else {
      toast.error("Invalid or expired code. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-8 shadow-lg rounded-xl border"
      >
        <h1 className="text-2xl font-bold mb-4 text-green-600">Verify OTP</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Please enter the 6-digit code sent to your email.
        </p>

        <input
          type="text"
          placeholder="Reset Code"
          className="w-full border p-3 rounded-lg mb-4 text-center tracking-[10px] font-bold text-xl outline-green-500"
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-green-600 text-white p-3 w-full rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>
    </div>
  );
}
