'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, Newspaper, Calendar, LogOut } from 'lucide-react'

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      
      <div className="p-6 font-bold text-xl">
        AAHII
        <p className="text-sm text-gray-500">Admin Excellence</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin" pathname={pathname} />
        <SidebarItem icon={Users} label="Vendors" href="/admin/vendors" pathname={pathname} />
        <SidebarItem icon={Newspaper} label="News" href="/admin/news" pathname={pathname} />
        <SidebarItem icon={Calendar} label="Events" href="/admin/events" pathname={pathname} />
      </nav>

      <div className="p-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

const SidebarItem = ({ icon: Icon, label, href, pathname }: any) => {
  const active = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
        ${
          active
            ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
        }
      `}
    >
      <Icon size={18} />
      {label}
    </Link>
  )
}