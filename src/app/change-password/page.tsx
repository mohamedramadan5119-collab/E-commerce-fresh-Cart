"use client";
import { useState } from "react";
import { updateLoggedPasswordAction } from "@/servises/auth";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ChangePasswordPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await updateLoggedPasswordAction(form, (session as any)?.token);

    if (res.message === "success") {
      toast.success("Password changed successfully!");
    } else {
      toast.error(res.errors?.msg || "Update failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-10 mt-10 shadow-lg border rounded-xl"
    >
      <h1 className="text-xl font-bold mb-4">Update Password</h1>
      <input
        type="password"
        placeholder="Current Password"
        className="w-full border p-2 mb-4"
        required
        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full border p-2 mb-4"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full border p-2 mb-4"
        required
        onChange={(e) => setForm({ ...form, rePassword: e.target.value })}
      />
      <button className="bg-green-600 text-white w-full p-2 rounded">
        Update
      </button>
    </form>
  );
}
