"use client";

import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { api } from "@/lib/axios";

export default function ForgotPasswordModal({ onClose }: any) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");
      setMsg("");

      await api.patch("/admin/auth/password", {
        email: email.trim(),
        password: newPassword.trim(),
      });

      setMsg("Password updated successfully ✅");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl space-y-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Reset Password
          </h2>

          <button onClick={onClose}>
            <X size={18} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Enter your email and new password
        </p>

        {/* EMAIL */}
        <div className="flex items-center rounded-xl px-3 bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <Mail size={16} className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full py-3 outline-none bg-transparent text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center rounded-xl px-3 bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <Lock size={16} className="text-gray-400 mr-2" />

          <input
            type={show ? "text" : "password"}
            placeholder="New password"
            className="w-full py-3 outline-none bg-transparent text-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button onClick={() => setShow(!show)}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ERROR / SUCCESS */}
        {error && <p className="text-sm text-red-500">{error}</p>}
        {msg && <p className="text-sm text-green-600">{msg}</p>}

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-linear-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}