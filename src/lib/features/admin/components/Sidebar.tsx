'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image";
import { LayoutDashboard, Users, Newspaper, Calendar, LogOut } from 'lucide-react'

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/admin/logout");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">

      <div className="p-6 flex items-center gap-3 border-b border-gray-100">

        {/* LOGO */}
        <div className="w-20 h-16 relative">
          <Image
            src="/logos/aahii-logo.png" // 👈 apna path confirm kar
            alt="AAHII Logo"
            fill
            className="object-contain rounded-full"
            priority
          />
        </div>

        {/* BRAND TEXT */}
        <div className="leading-tight">
          <p className="font-semibold text-gray-900 text-base">
            AAHII
          </p>
          <p className="text-xs text-gray-400">
            Admin Panel
          </p>
        </div>

      </div>

      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin" pathname={pathname} />
        <SidebarItem icon={Users} label="Vendors" href="/admin/vendors" pathname={pathname} />
        <SidebarItem icon={Newspaper} label="News" href="/admin/news" pathname={pathname} />
        <SidebarItem icon={Calendar} label="Events" href="/admin/events" pathname={pathname} />
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
};

const SidebarItem = ({ icon: Icon, label, href, pathname }: any) => {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
        ${active
          ? 'bg-blue-50 text-blue-600 font-medium shadow-sm'
          : 'text-gray-600 hover:bg-gray-100'
        }
      `}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
};