"use client";

import { useState } from "react";
import { adminLogin } from "@/lib/features/admin/news/api/auth.api";

export default function AdminLoginModal({ onClose }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await adminLogin(email, password);

      // 🔥 IMPORTANT
      localStorage.setItem("token", res.admin_token);

      alert("Login Successful ✅");

      onClose();
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-lg font-semibold">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          onClick={onClose}
          className="text-sm text-gray-500 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}