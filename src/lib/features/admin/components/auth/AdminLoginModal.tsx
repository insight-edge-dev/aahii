"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { adminLogin } from "@/lib/features/admin/news/api/auth.api";
import ForgotPasswordModal from "@/lib/features/admin/components/auth/ForgotPasswordModal";
export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      await adminLogin(email, password);

      router.push("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
  const [openForgot, setOpenForgot] = useState(false);
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-indigo-100 via-blue-50 to-white relative overflow-hidden">

      {/* 🔥 BACKGROUND BLOBS */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[140px] opacity-30" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-300 rounded-full blur-[140px] opacity-30" />

      {/* 💎 CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] space-y-6 border border-white/40">

        {/* Header */}
        <div className="text-center space-y-2">
          <img
            src="/logos/aahii-logo.png"
            alt="logo"
            className="w-14 h-14 mx-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-gray-900">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500">
            Enter your credentials to continue
          </p>
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            Email
          </label>

          <div className="flex items-center rounded-xl px-3 bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition">

            <Mail size={16} className="text-gray-400 mr-2" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 outline-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-600">
              Password
            </label>
           
          </div>
        
          <div className="flex items-center rounded-xl px-3 bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] transition">

            <Lock size={16} className="text-gray-400 mr-2" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 outline-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl hover:opacity-90 transition font-medium shadow-md disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center">
          © AAHII Healthcare. All rights reserved.
        </p>

      </div>
        {/* 🔥 MODAL */}
          {openForgot && (
            <ForgotPasswordModal onClose={() => setOpenForgot(false)} />
          )}
    </div>
  );
}