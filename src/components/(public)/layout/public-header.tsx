"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass =
    "text-[14px] font-sans font-normal leading-[20px] tracking-[0px] transition-colors hover:text-white";

  return (
    <header className="sticky top-0 z-50 w-full bg-[#18181D]">
      <div className="flex h-[96px] w-full items-center px-6 lg:px-[80px]">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Provera AI home"
          className="flex h-[30px] w-[182px] shrink-0 items-center"
        >
          <Image
            src="/provera-logo.png"
            alt="Provera AI"
            width={182}
            height={29}
            priority
            className="h-auto w-full"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="ml-auto hidden items-center gap-[70px] lg:flex"
        >
          <Link href="/#features" className={navLinkClass}>
            Features
          </Link>

          <Link href="/#how-it-works" className={navLinkClass}>
            How it works
          </Link>

          <Link href="/faq" className={navLinkClass}>
            FAQs
          </Link>
        </nav>

        {/* Desktop sign in */}
        <Link
          href="/login"
          className="ml-auto hidden h-[46px] w-[191px] shrink-0 items-center justify-center rounded-[9px] bg-[#455EFF] px-4 font-[family-name:var(--font-dm-sans)] text-[14px] font-medium leading-5 text-[#EDEFFF] transition-colors hover:bg-[#4057E6] lg:flex"
        >
          Sign in
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-[#EDEFFF] transition-colors hover:bg-white/5 lg:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-[#343541] px-6 py-5 lg:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-5">
            <Link
              href="/#features"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              Features
            </Link>

            <Link
              href="/#how-it-works"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              How it works
            </Link>

            <Link
              href="/faq"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              FAQs
            </Link>

            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 items-center justify-center rounded-lg bg-[#455EFF] font-[family-name:var(--font-dm-sans)] text-[14px] font-medium leading-5 text-[#EDEFFF] transition-colors hover:bg-[#4057E6]"
            >
              Sign in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
