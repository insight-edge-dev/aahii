"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X, Home as HomeIcon } from "lucide-react";
import clsx from "clsx";
import { primaryNavigation } from "@/content/navigation";
import BrandingBar from "./BrandingBar";

export default function MainNav() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            {primaryNavigation.map((item) => (
              <li key={item.label} className="relative group">
                <Link
                  href={item.href ?? "#"}
                  className={clsx(
                    "flex items-center gap-1 py-2 px-2.5 rounded-md transition whitespace-nowrap",
                    isActive(item.href)
                      ? "bg-(--nav-blue) text-white font-semibold"
                      : `
                  text-slate-700
                  group-hover:bg-(--nav-blue)
                  group-hover:text-white
                `,
                  )}
                >
                  {item.label === "Home" ? (
                    <HomeIcon className="w-4 h-4" />
                  ) : (
                    <span>{item.label}</span>
                  )}

                  {item.children && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <ul
                    className="
                absolute left-0 top-full mt-2 min-w-56
                bg-white shadow-xl rounded-xl py-2
                opacity-0 invisible translate-y-1
                group-hover:opacity-100
                group-hover:visible
                group-hover:translate-y-0
                transition-all duration-200
              "
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href!}
                          className={clsx(
                            "block px-2.5 py-2 mx-2 rounded-md transition ",
                            isActive(child.href)
                              ? "bg-(--nav-blue) text-white font-medium"
                              : "text-slate-600 hover:bg-(--nav-blue) hover:text-white",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
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
                            "flex items-center gap-2 flex-1",
                            isActive(item.href)
                              ? "text-blue-700"
                              : "text-slate-800",
                          )}
                          onClick={closeMenu}
                        >
                          {item.label === "Home" && (
                            <HomeIcon className="w-4 h-4" />
                          )}
                          {item.label}
                        </Link>
                      ) : (
                        <span className="flex-1">{item.label}</span>
                      )}

                      {hasChildren && (
                        <button
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
                        <ul className="ml-3 mt-2 space-y-1">
                          {item.children!.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href!}
                                className={clsx(
                                  "block py-2 text-sm",
                                  isActive(child.href)
                                    ? "text-blue-700 font-medium"
                                    : "text-slate-700",
                                )}
                                onClick={closeMenu}
                              >
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
