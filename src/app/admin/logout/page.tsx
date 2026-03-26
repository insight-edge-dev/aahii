"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      router.replace("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // 🔥 Auto logout on page load
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-2xl shadow-md text-center space-y-4">

        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <LogOut className="text-red-600" size={20} />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Logging you out...
        </h2>

        <p className="text-sm text-gray-500">
          Please wait while we securely log you out
        </p>

      </div>

    </div>
  );
}