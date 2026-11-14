import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin-layout/admin-sidebar";
import { AdminHeader } from "@/components/admin-layout/admin-header";
import { AdminAuthGuard } from "./auth-guard/admin-auth-guard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-black text-[#EDEFFF]">
        <AdminHeader />
        <AdminSidebar />

        <main className="min-h-screen px-5 pb-8 pt-[108px] sm:px-8 lg:ml-[240px] lg:px-10 lg:pt-[112px]">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
