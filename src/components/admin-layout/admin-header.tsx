"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/admin": "ADMIN OVERVIEW",
  "/admin/users": "USERS & ACCESS",
  "/admin/data-sources": "DATA SOURCES",
  "/admin/detection-rules": "DETECTION RULES",
  "/admin/risk-thresholds": "RISK THRESHOLDS",
  "/admin/activity": "PLATFORM ACTIVITY",
  "/admin/settings": "PLATFORM SETTINGS",
  "/workspace/transactions": "ALL TRANSACTIONS",
  "/workspace/flagged-transactions": "FLAGGED TRANSACTIONS",
  "/workspace/transaction-data": "TRANSACTION DATA",
  "/upload": "UPLOAD DATA",
};

export function AdminHeader() {
  const pathname = usePathname();

  const pageName =
    pageNames[pathname] ??
    Object.entries(pageNames).find(
      ([path]) => path !== "/admin" && pathname.startsWith(`${path}/`),
    )?.[1] ??
    "ADMIN WORKSPACE";

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-[76px] border-b border-[#1F2028] bg-[#111217]">
      <div className="flex h-full items-center px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/admin"
          aria-label="Provera AI Admin Overview"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/provera-logo.png"
            alt="Provera AI"
            width={135}
            height={32}
            priority
            className="h-auto w-[115px] sm:w-[135px]"
          />
        </Link>

        {/* Current page */}
        <div className="ml-5 hidden min-w-0 truncate font-sans text-[12px] uppercase leading-[18px] text-[#B7B9CB] sm:ml-10 sm:block">
          ADMIN / {pageName}
        </div>

        {/* Workspace label */}
        <div className="ml-auto flex shrink-0 items-center gap-2 text-[10px] font-medium uppercase tracking-wide text-[#B7B9CB] sm:text-[12px]">
          <span className="h-2 w-2 rounded-full bg-[#34E89A]" />
          <span className="hidden sm:inline">Admin workspace</span>
          <span className="sm:hidden">Admin</span>
        </div>
      </div>
    </header>
  );
}
