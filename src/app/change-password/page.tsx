"use client";
import { useState } from "react";
import { updateLoggedPasswordAction } from "../../auth";
import { useSession, signOut } from "next-auth/react"; 
import toast from "react-hot-toast";

export default function ChangePasswordPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const token = (session as any)?.token;
    if (!token) {
      toast.error("You are not logged in. Please login again.");
      return;
    }

    setLoading(true);
    try {
      const res = await updateLoggedPasswordAction(form, token);

      if (res.message === "success") {
        toast.success("Password changed successfully! Redirecting to login...");
        
        setTimeout(() => {
          signOut({ callbackUrl: "/login" }); 
        }, 2000); 

      } else {
        const errorMsg = res.message || "Update failed";
        toast.error(errorMsg);
        
        if (errorMsg.toLowerCase().includes("token")) {
             toast.error("Session expired, logging you out...");
             setTimeout(() => signOut({ callbackUrl: "/login" }), 2000);
        }
      }
    } catch (error) {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" h-screen md:hyphens-manual flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg  p-10 shadow-xl border border-gray-100 rounded-3xl"
      >
        <h1 className="text-2xl text-primary font-bold mb-6">Change Password</h1>
        
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-green-500"
            required
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-green-500"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border border-gray-200 p-3 rounded-lg focus:outline-green-500"
            required
            onChange={(e) => setForm({ ...form, rePassword: e.target.value })}
          />
          
          <button 
            disabled={loading}
            className={`bg-primary text-white w-full p-3 rounded-lg font-semibold transition-all hover:bg-green-700 ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}