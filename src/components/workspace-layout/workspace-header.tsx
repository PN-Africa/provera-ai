"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const pageNames: Record<string, string> = {
  "/workspace/overview": "OVERVIEW",
  "/workspace/transactions": "ALL TRANSACTIONS",
  "/workspace/flagged-transactions": "FLAGGED TRANSACTIONS",
  "/workspace/transaction-data": "TRANSACTION DATA",
  "/workspace/users": "USERS & ACCESS",
  "/workspace/detection-configuration": "DETECTION CONFIGURATION",
  "/workspace/activity": "PLATFORM ACTIVITY",
  "/workspace/account": "ACCOUNT & GUIDANCE",
};

export function WorkspaceHeader() {
  const pathname = usePathname();

  const pageName = pageNames[pathname] ?? "WORKSPACE";

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-[76px] border-b border-[#1F2028] bg-[#111217]">
      <div className="flex h-full items-center px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/provera-logo.png"
            alt="Provera AI"
            width={135}
            height={32}
            priority
            className="h-auto w-[135px]"
          />
        </div>

        {/* Page context */}
        <div className="ml-[55px] font-sans text-[12px] font-normal uppercase leading-[18px] text-[#B7B9CB]">
          WORKSPACE / {pageName}
        </div>

        {/* Workspace type */}
        <div className="ml-auto font-sans text-[12px] font-normal uppercase leading-[18px] text-[#B7B9CB]">
          PRIVATE WORKSPACE
        </div>
      </div>
    </header>
  );
}
