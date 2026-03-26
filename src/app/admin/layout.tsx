import { Sidebar } from '@/lib/features/admin/components/Sidebar'
import { Header } from '@/lib/features/admin/components/Header'
import { Toaster } from 'react-hot-toast'
import { requireAdmin } from '@/lib/adminAuth'
import { AdminRole } from '@prisma/client'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: any) {

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const isLoginPage = pathname.includes("/login");
  
  // ✅ If NOT login page → protect
  if (!isLoginPage && !token) {
    redirect("/login");
  }

  if (!isLoginPage) {
    await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);
  }

  // ✅ Login page → no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // ✅ Protected UI
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">{children}</main>
      </div>

      <Toaster position="top-right" />
    </div>
  )
}