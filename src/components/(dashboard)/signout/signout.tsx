"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";
import { useState } from "react";

export function Signout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleSignOut() {
    if (loading) return;

    setLoading(true);

    try {
      await logout();
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }
  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="mt-6 flex h-[46px] w-[180px] items-center justify-center rounded-[6px] border border-[#90EFC5] bg-[#34E89A] font-sans text-[14px] font-medium leading-[20px] text-[#0B0C0E] transition hover:bg-[#90EFC5] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
