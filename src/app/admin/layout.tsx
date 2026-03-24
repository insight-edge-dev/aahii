import { Sidebar } from '@/lib/features/admin/components/Sidebar'
import { Header } from '@/lib/features/admin/components/Header'
import { Toaster } from 'react-hot-toast'
import { requireAdmin } from '@/lib/adminAuth'
import { AdminRole } from '@prisma/client'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // 🔐 PROTECTION (SERVER SIDE)
  await requireAdmin([AdminRole.ADMIN, AdminRole.SUPER_ADMIN]);

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