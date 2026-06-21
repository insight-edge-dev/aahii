"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Building2,
  ChevronDown,
  FileText,
  GraduationCap,
  Handshake,
  Home as HomeIcon,
  Images,
  Info,
  Landmark,
  LayoutGrid,
  LogIn,
  Microscope,
  Newspaper,
  Phone,
  Shield,
  Stethoscope,
  Target,
  User,
  Users,
  UsersRound,
  Video,
  X,
} from "lucide-react";
import clsx from "clsx";
import { primaryNavigation } from "@/content/navigation";
import BrandingBar from "./BrandingBar";

function NavItemIcon({
  label,
  className = "h-4 w-4",
}: {
  label: string;
  className?: string;
}) {
  const iconClassName = clsx(className, "shrink-0 transition-colors duration-200");

  switch (label) {
    case "Home":
      return <HomeIcon className={iconClassName} aria-hidden="true" />;
    case "About":
      return <Info className={iconClassName} aria-hidden="true" />;
    case "Departments":
      return <Building2 className={iconClassName} aria-hidden="true" />;
    case "Research & Development":
      return <Microscope className={iconClassName} aria-hidden="true" />;
    case "Infrastructure":
      return <Landmark className={iconClassName} aria-hidden="true" />;
    case "Tenders":
      return <FileText className={iconClassName} aria-hidden="true" />;
    case "Contact Us":
      return <Phone className={iconClassName} aria-hidden="true" />;
    case "Careers":
      return <Briefcase className={iconClassName} aria-hidden="true" />;
    case "News & Media":
      return <Newspaper className={iconClassName} aria-hidden="true" />;
    case "Vendors":
      return <Handshake className={iconClassName} aria-hidden="true" />;
    case "Login":
      return <LogIn className={iconClassName} aria-hidden="true" />;
    case "Employee Login":
      return <User className={iconClassName} aria-hidden="true" />;
    case "Admin Login":
      return <Shield className={iconClassName} aria-hidden="true" />;
    case "Vision & Mission":
      return <Target className={iconClassName} aria-hidden="true" />;
    case "Board of Directors":
      return <Users className={iconClassName} aria-hidden="true" />;
    case "Management Team":
      return <Building2 className={iconClassName} aria-hidden="true" />;
    case "Upcoming Departments":
      return <LayoutGrid className={iconClassName} aria-hidden="true" />;
    case "Clinical Services":
      return <Stethoscope className={iconClassName} aria-hidden="true" />;
    case "Vacancies":
      return <Briefcase className={iconClassName} aria-hidden="true" />;
    case "Fellowship  / Internship":
    case "Fellowship / Internship":
      return <GraduationCap className={iconClassName} aria-hidden="true" />;
    case "News":
      return <Newspaper className={iconClassName} aria-hidden="true" />;
    case "Gallery":
      return <Images className={iconClassName} aria-hidden="true" />;
    case "Videos":
      return <Video className={iconClassName} aria-hidden="true" />;
    case "Employee Engagement":
      return <UsersRound className={iconClassName} aria-hidden="true" />;
    default:
      return null;
  }
}

export default function MainNav() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [desktopOpenIndex, setDesktopOpenIndex] = useState<number | null>(null);

  const openMenu = () => setMobileOpen(true);
  const closeMenu = () => {
    setMobileOpen(false);
    setOpenIndex(null);
  };

  /* lock background scroll (mobile menu only) */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ================= BRANDING BAR ================= */}
      {/* Sticky ONLY on mobile */}
      <div className="sticky top-0 z-50 bg-white md:static">
        <BrandingBar onOpenMenu={openMenu} />
      </div>

      {/* ================= DESKTOP NAV (STICKY) ================= */}
      <nav className="hidden md:block sticky top-0 z-40 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center justify-center gap-10 h-14 text-sm font-medium">
            {primaryNavigation.map((item, index) => {
              const hasChildren = !!item.children?.length;
              const isDropdownOnly = hasChildren && (!item.href || item.disabled);
              const isOpen = desktopOpenIndex === index;
              const dropdownId = `desktop-nav-dropdown-${index}`;

              return (
                <li
                  key={item.label}
                  className="relative group"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setDesktopOpenIndex(null);
                    }
                  }}
                  onFocus={() => hasChildren && setDesktopOpenIndex(index)}
                  onMouseEnter={() => hasChildren && setDesktopOpenIndex(index)}
                  onMouseLeave={() => hasChildren && setDesktopOpenIndex(null)}
                >
                  {isDropdownOnly ? (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      aria-controls={dropdownId}
                      className={clsx(
                        "flex items-center gap-2 rounded-md px-2.5 py-2 whitespace-nowrap transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2",
                        isOpen
                          ? "bg-(--nav-blue) text-white font-semibold"
                          : "text-slate-700 group-hover:bg-(--nav-blue) group-hover:text-white",
                      )}
                      onClick={() =>
                        setDesktopOpenIndex(index)
                      }
                    >
                      <NavItemIcon label={item.label} />
                      <span>{item.label}</span>
                      <ChevronDown
                        className={clsx(
                          "h-4 w-4 transition-transform duration-200",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      className={clsx(
                        "flex items-center gap-2 py-2 px-2.5 rounded-md transition duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2",
                        isActive(item.href)
                          ? "bg-(--nav-blue) text-white font-semibold"
                          : "text-slate-700 group-hover:bg-(--nav-blue) group-hover:text-white",
                      )}
                    >
                      <NavItemIcon label={item.label} />
                      <span>{item.label}</span>

                      {hasChildren && (
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                    </Link>
                  )}

                  {hasChildren && (
                    <ul
                      id={dropdownId}
                      role="menu"
                      className={clsx(
                        "absolute left-0 top-full mt-2 min-w-60 rounded-xl border border-slate-100 bg-white p-3 shadow-xl transition-all duration-200 ease-out",
                        item.label === "Login" && "w-64",
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible translate-y-1 opacity-0",
                      )}
                    >
                      <li
                        role="none"
                        className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400"
                      >
                        {item.label}
                      </li>
                      {item.children!.map((child) => (
                        <li key={child.label} role="none">
                          <Link
                            href={child.href!}
                            role="menuitem"
                            className={clsx(
                              "group/dropdownitem relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--nav-blue) focus-visible:ring-offset-2",
                              isActive(child.href)
                                ? "bg-(--nav-blue) text-white font-medium"
                                : "text-slate-700 hover:bg-blue-50 hover:text-(--nav-blue)",
                            )}
                            onClick={() => setDesktopOpenIndex(null)}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-(--nav-blue) opacity-0 transition-opacity duration-200 group-hover/dropdownitem:opacity-100"
                            />
                            <NavItemIcon label={child.label} className="h-4 w-4" />
                            <span>{child.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={clsx(
          "fixed inset-0 z-50 md:hidden transition-opacity duration-200",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div onClick={closeMenu} className="absolute inset-0 bg-black/30" />

        <div
          className={clsx(
            "absolute left-0 right-0 top-0 bg-[#eaf1fb] shadow-lg",
            "transition-transform duration-300 ease-out",
            mobileOpen ? "translate-y-0" : "-translate-y-3",
            "max-h-screen",
          )}
        >
          <div className="flex items-center justify-end px-5 h-14 bg-[#eaf1fb]">
            <button onClick={closeMenu} aria-label="Close menu" className="p-2">
              <X className="w-6 h-6 text-blue-700" />
            </button>
          </div>

          <div className="h-px bg-slate-300/50" />

          <div className="overflow-y-auto overscroll-contain">
            <ul className="px-5 py-4 space-y-2">
              {primaryNavigation.map((item, index) => {
                const isOpen = openIndex === index;
                const hasChildren = !!item.children?.length;

                return (
                  <li key={item.label}>
                    <div className="flex items-center justify-between py-4 font-semibold">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className={clsx(
                            "flex items-center gap-2 flex-1 transition-colors duration-200",
                            isActive(item.href)
                              ? "text-blue-700"
                              : "text-slate-800",
                          )}
                          onClick={closeMenu}
                        >
                          <NavItemIcon label={item.label} className="h-[18px] w-[18px]" />
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          aria-expanded={hasChildren ? isOpen : undefined}
                          aria-haspopup={hasChildren ? "menu" : undefined}
                          className="flex flex-1 items-center gap-2 text-left text-slate-800 transition-colors duration-200"
                          onClick={() => {
                            if (hasChildren) {
                              setOpenIndex(isOpen ? null : index);
                            }
                          }}
                        >
                          <NavItemIcon label={item.label} className="h-[18px] w-[18px]" />
                          {item.label}
                        </button>
                      )}

                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                          aria-expanded={isOpen}
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenIndex(isOpen ? null : index);
                          }}
                        >
                          <ChevronDown
                            className={clsx(
                              "w-5 h-5 transition-transform",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && (
                      <div
                        className={clsx(
                          "overflow-hidden transition-all duration-300",
                          isOpen ? "max-h-96" : "max-h-0",
                        )}
                      >
                        <ul className="ml-3 mt-2 space-y-1 rounded-xl bg-white/45 px-3 py-3">
                          <li
                            aria-hidden="true"
                            className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"
                          >
                            {item.label}
                          </li>
                          {item.children!.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href!}
                                className={clsx(
                                  "group/mobileitem relative flex items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors duration-200",
                                  isActive(child.href)
                                    ? "bg-white text-blue-700 font-medium"
                                    : "text-slate-700 hover:bg-white hover:text-blue-700",
                                )}
                                onClick={closeMenu}
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-blue-700 opacity-0 transition-opacity duration-200 group-hover/mobileitem:opacity-100"
                                />
                                <NavItemIcon label={child.label} className="h-[18px] w-[18px]" />
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
