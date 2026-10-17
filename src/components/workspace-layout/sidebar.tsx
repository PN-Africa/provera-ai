"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  {
    label: "Overview",
    href: "/workspace/overview",
  },
  {
    label: "All transactions",
    href: "/workspace/transactions",
  },
  {
    label: "Flagged transactions",
    href: "/workspace/flagged-transactions",
  },
  {
    label: "Transaction data",
    href: "/workspace/transaction-data",
  },
  {
    label: "Users & access",
    href: "/workspace/users",
  },
  {
    label: "Detection configuration",
    href: "/workspace/detection-configuration",
  },
  {
    label: "Platform activity",
    href: "/workspace/platform-activity",
  },
  {
    label: "Account & guidance",
    href: "/workspace/account",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-[92px] z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-[#343644] bg-[#111217] text-[#EDEFFF] lg:hidden"
      >
        <span className="text-xl leading-none">☰</span>
      </button>

      {/* Mobile backdrop */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-[76px] z-30 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-[76px] z-40 flex h-[calc(100vh-76px)] w-[240px] flex-col bg-[#111217] px-4 py-4 transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Mobile close button */}
        <div className="mb-3 flex items-center justify-between lg:hidden">
          <p className="font-manrope text-[16px] font-semibold text-[#EDEFFF]">
            Provera AI
          </p>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#B7B9CB] hover:bg-[#1C1D27] hover:text-[#EDEFFF]"
          >
            ×
          </button>
        </div>

        {/* Label */}
        <p className="px-4 font-sans text-[12px] font-medium uppercase leading-[18px] text-[#B7B9CB]">
          Analyst Workspace
        </p>

        {/* Navigation */}
        <nav className="mt-2 flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex h-[44px] items-center rounded-lg px-4 font-sans text-[14px] font-normal leading-[20px] transition ${
                  isActive
                    ? "bg-[#252D55] text-[#EDEFFF]"
                    : "text-[#EDEFFF] hover:bg-[#1C1D27]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Disclaimer */}
        <div className="mt-4 rounded-lg border border-[#343644] bg-[#171A2E] px-4 py-4">
          <p className="font-sans text-[14px] font-normal leading-[20px] text-[#B7B9CB]">
            A signal starts a review. It does not confirm fraud.
          </p>
        </div>
      </aside>
    </>
  );
}
