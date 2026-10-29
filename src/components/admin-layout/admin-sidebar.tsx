"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  //   Activity,
  //   Database,
  //   FileText,
  //   LayoutDashboard,
  //   ListChecks,
  Menu,
  //   Settings,
  //   ShieldAlert,
  //   SlidersHorizontal,
  //   Upload,
  //   Users,
  X,
} from "lucide-react";

const workspaceNavigation = [
  {
    label: "Overview",
    href: "/admin/workspace/overview",
  },
  {
    label: "All transactions",
    href: "/admin/workspace/transactions",
  },
  {
    label: "Flagged transactions",
    href: "/admin/workspace/flagged-transactions",
  },
  {
    label: "Transaction data",
    href: "/admin/workspace/transaction-data",
  },
];

const adminNavigation = [
  {
    label: "Admin Overview",
    href: "/admin/admin-overview",
  },
  {
    label: "Users & access",
    href: "/admin/users-and-access",
  },
  {
    label: "Data sources",
    href: "/admin/data-sources",
  },
  {
    label: "Detection rules",
    href: "/admin/detection-rules",
  },
  {
    label: "Risk thresholds",
    href: "/admin/risk-thresholds",
  },
  {
    label: "Platform activity",
    href: "/admin/platform-activity",
  },
  {
    label: "Platform settings",
    href: "/admin/platform-settings",
  },
  {
    label: "Logout",
    href: "/admin/logout",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function renderNavigation(items: typeof workspaceNavigation) {
    return items.map((item) => {
      const isActive =
        pathname === item.href ||
        (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setIsOpen(false)}
          aria-current={isActive ? "page" : undefined}
          className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 font-sans text-[14px] transition-colors duration-200 ${
            isActive
              ? "bg-[#203B30] text-[#EDEFFF]"
              : "text-[#EDEFFF] hover:bg-[#172B23]"
          }`}
        >
          {/* <Icon size={18} strokeWidth={1.7} /> */}
          <span>{item.label}</span>
        </Link>
      );
    });
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open admin navigation"
        aria-expanded={isOpen}
        className="fixed left-4 top-[88px] z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-[#343644] bg-[#141418] text-[#EDEFFF] transition-colors hover:bg-[#203B30] lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close admin navigation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-[76px] z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-[76px] z-50 flex w-[240px] flex-col border-r border-[#1F2028] bg-[#141418] px-4 py-5 transition-transform duration-200 ease-in-out lg:z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Mobile heading */}
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <span className="text-sm font-semibold text-[#EDEFFF]">
            Admin workspace
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close admin navigation"
            className="rounded-md p-2 text-[#A8ADB8] transition hover:bg-[#232329] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <p className="px-3 text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
          Admin workspace
        </p>

        <nav
          aria-label="Admin navigation"
          className="mt-3 flex-1 space-y-6 overflow-y-auto"
        >
          <div className="space-y-1">
            {renderNavigation(workspaceNavigation)}
          </div>

          <div>
            <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-[#777B8B]">
              Administration
            </p>

            <div className="space-y-1">{renderNavigation(adminNavigation)}</div>
          </div>
        </nav>

        {/* Disclaimer */}
        <div className="mt-4 rounded-lg border border-[#343644] bg-[#202027] px-3 py-3">
          <p className="text-[12px] leading-5 text-[#A8ADB8]">
            Changes are recorded in platform activity.
          </p>
        </div>
      </aside>
    </>
  );
}
