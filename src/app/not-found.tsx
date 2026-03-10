import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 md:p-14 text-center">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-blue-600 rounded-t-3xl flex items-center px-6">
          <span className="text-white font-bold text-lg">
            404 Not Found
          </span>
          <div className="ml-auto flex gap-3">
            <span className="w-3 h-3 bg-white/70 rounded-full" />
            <span className="w-3 h-3 bg-white/70 rounded-full" />
            <span className="w-3 h-3 bg-white/70 rounded-full" />
          </div>
        </div>

        {/* Illustration (IMAGE) */}
        <div className="mt-14 flex justify-center">
          <Image
            src="/404.png" // 👈 put image in /public
            alt="404 Page Not Found"
            width={420}
            height={260}
            priority
            className="max-w-full h-auto"
          />
        </div>

        {/* Text */}
        <h1 className="mt-10 text-3xl md:text-4xl font-bold text-slate-900">
          Oops! Page not found
        </h1>

        <p className="mt-3 text-slate-600 max-w-xl mx-auto">
          The page you are looking for doesn’t exist or may have been moved.
          Don’t worry — let’s get you back on track.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center
              rounded-full bg-blue-600 px-8 py-3
              text-white font-medium
              hover:bg-blue-700 transition"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
