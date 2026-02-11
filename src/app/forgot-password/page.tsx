"use client";
import { useState } from "react";
import { forgotPasswordAction } from "../../auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await forgotPasswordAction(email);

    if (res.statusMsg === "success") {
      toast.success(res.message || "Code sent to your email");
      router.push("/verify-code");
    } else {
      toast.error(res.message || "Email not found");
    }
    setLoading(false);
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-8 shadow-lg rounded-xl border"
      >
        <h1 className="text-2xl font-bold mb-6 text-green-600">
          Forgot Password
        </h1>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-3 rounded-lg mb-4 outline-green-500"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className="bg-green-600 text-white p-3 w-full rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Sending..." : "Send Verification Code"}
        </button>
      </form>
    </div>
  );
}
