"use client";
import { useState } from "react";
import { resetPasswordAction } from "@/auth"; 
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await resetPasswordAction(form);

    if (res.token) {
      toast.success("Password Updated! You can now login.");
      router.push("/login");
    } else {
      toast.error(res.message || "Failed to reset password");
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
          Create New Password
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Confirm your email"
            className="w-full border p-3 rounded-lg outline-green-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg outline-green-500"
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            required
          />

          <button
            disabled={loading}
            className="bg-green-600 text-white p-3 w-full rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-all"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
