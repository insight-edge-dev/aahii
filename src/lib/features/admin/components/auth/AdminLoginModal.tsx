"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";

import { adminLogin } from "@/lib/features/admin/news/api/auth.api";
import ForgotPasswordModal from "@/lib/features/admin/components/auth/ForgotPasswordModal";
import LoginTransition from "@/lib/features/admin/components/LoginTransition";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openForgot, setOpenForgot] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await adminLogin(email, password);

      setShowTransition(true);
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "error" in err.response.data &&
        typeof err.response.data.error === "string"
          ? err.response.data.error
          : "Invalid credentials";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.section
        className="mx-auto w-full max-w-md rounded-3xl border border-white/50 bg-white/[0.92] p-7 shadow-[0_28px_90px_rgba(2,6,23,0.32)] backdrop-blur-[20px] sm:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        aria-labelledby="admin-login-title"
      >
        <div className="text-center">
          <motion.div
            className="mx-auto flex size-20 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50 shadow-inner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.16, duration: 0.35 }}
          >
            <Image
              src="/logos/aahii-logo.png"
              alt="AAHII logo"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </motion.div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Assam Advanced Healthcare Innovation Institute
          </p>
          <h1
            id="admin-login-title"
            className="mt-3 text-2xl font-bold tracking-tight text-slate-950"
          >
            Admin Login
          </h1>
          <p className="mt-2 text-sm font-medium text-slate-500">
            A Government of Assam & IIT Guwahati Initiative
          </p>
        </div>

        <form className="mt-7 space-y-5" onSubmit={handleLogin}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="admin-email"
            >
              Email
            </label>

            <div className="flex items-center rounded-xl border border-slate-200 bg-white/80 px-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Mail size={16} className="mr-2 text-slate-400" aria-hidden="true" />

              <input
                id="admin-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-transparent py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="admin-password"
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs font-semibold text-blue-700 transition hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                onClick={() => setOpenForgot(true)}
              >
                Forgot password?
              </button>
            </div>

            <div className="flex items-center rounded-xl border border-slate-200 bg-white/80 px-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Lock size={16} className="mr-2 text-slate-400" aria-hidden="true" />

              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-transparent py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="rounded-md p-1 text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#0f2a6d] to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-medium text-slate-400">
          © AAHII Healthcare. All rights reserved.
        </p>
      </motion.section>

      {openForgot ? (
        <ForgotPasswordModal onClose={() => setOpenForgot(false)} />
      ) : null}

      <LoginTransition
        active={showTransition}
        onComplete={() => router.push("/admin")}
      />
    </>
  );
}
