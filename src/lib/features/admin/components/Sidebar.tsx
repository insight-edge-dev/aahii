'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image";
import { LayoutDashboard, Users, Newspaper, Calendar, LogOut, FileText, Megaphone, Briefcase, type LucideIcon } from 'lucide-react'

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/admin/logout");
  };

  return (
    <aside className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto border-r border-blue-100/80 bg-[radial-gradient(circle_at_top_left,_rgba(219,234,254,0.95),_rgba(255,255,255,0.98)_34%,_rgba(239,246,255,0.92)_100%)] shadow-[8px_0_30px_rgba(15,23,42,0.05)]">
      <div className="flex min-h-full flex-col p-4">

        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur">

          {/* LOGO */}
          <div className="relative h-14 w-16 shrink-0 rounded-2xl border border-blue-50 bg-gradient-to-br from-white to-blue-50 shadow-inner">
            <Image
              src="/logos/aahii-logo.png"
              alt="AAHII Logo"
              fill
              className="object-contain p-1.5"
              priority
            />
          </div>

          {/* BRAND TEXT */}
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight text-slate-950">
              AAHII
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-blue-500">
              Admin Panel
            </p>
          </div>

        </div>

        <nav className="flex-1 space-y-1.5">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin" pathname={pathname} />
          <SidebarItem icon={Users} label="Vendors" href="/admin/vendors" pathname={pathname} />
          <SidebarItem icon={FileText} label="Tenders" href="/admin/tenders" pathname={pathname} />
          <SidebarItem icon={Newspaper} label="News" href="/admin/news" pathname={pathname} />
          <SidebarItem icon={Megaphone} label="Announcements" href="/admin/announcements" pathname={pathname} />
          <SidebarItem icon={Briefcase} label="Vacancies" href="/admin/vacancies" pathname={pathname} />
          <SidebarItem icon={Calendar} label="Events" href="/admin/events" pathname={pathname} />
        </nav>

        <div className="mt-6 rounded-2xl border border-blue-100/80 bg-white/80 p-3 shadow-sm backdrop-blur">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-gradient-to-br from-blue-50 to-white p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm">
              A
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                AAHII Admin
              </p>
              <p className="text-xs font-medium text-slate-500">
                Secure workspace
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-100 hover:bg-red-50 hover:text-red-600 hover:shadow-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>
    </aside>
  );
};

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  pathname: string;
};

const SidebarItem = ({ icon: Icon, label, href, pathname }: SidebarItemProps) => {
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-200
        ${active
          ? 'bg-gradient-to-r from-blue-700 to-sky-500 text-white font-semibold shadow-[0_10px_24px_rgba(37,99,235,0.24)]'
          : 'text-slate-600 hover:-translate-y-0.5 hover:bg-white/85 hover:text-blue-700 hover:shadow-sm'
        }
      `}
    >
      <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors
        ${active
          ? 'bg-white/20 text-white'
          : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
        }
      `}>
        <Icon size={18} />
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
};
