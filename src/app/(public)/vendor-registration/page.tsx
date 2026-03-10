import Link from "next/link";
import Image from "next/image";

export default function VendorComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl overflow-hidden">

        {/* Top bar */}
        <div className="bg-blue-600 px-6 py-3 flex justify-between items-center">
          <h2 className="text-white font-semibold">Vendor Registration</h2>

          <div className="flex gap-2">
            <span className="w-3 h-3 bg-white/60 rounded-full"></span>
            <span className="w-3 h-3 bg-white/60 rounded-full"></span>
            <span className="w-3 h-3 bg-white/60 rounded-full"></span>
          </div>
        </div>

        {/* Content */}
        <div className="text-center p-10">

         

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Vendor Registration Coming Soon
          </h1>

          <p className="text-gray-600 mb-6">
            We are currently preparing our vendor onboarding system.
            Soon you will be able to register and collaborate with AAHII.
            Stay tuned!
          </p>

          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Go to Homepage
          </Link>

        </div>
      </div>
    </div>
  );
}