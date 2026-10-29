"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api/auth";

export function WorkspaceAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkAuthentication() {
      setAuthorized(false);

      try {
        const user = await getCurrentUser();

        if (cancelled) return;

        const role = user.role.toLowerCase();

        if (role === "admin" || role === "administrator") {
          router.replace("/admin/workspace/overview");
          return;
        }

        setAuthorized(true);
      } catch {
        if (!cancelled) {
          router.replace("/login");
        }
      }
    }

    void checkAuthentication();

    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#18181D]">
        <div
          role="status"
          aria-label="Checking authentication"
          className="h-8 w-8 animate-spin rounded-full border-2 border-[#343541] border-t-[#34E89A]"
        />
      </div>
    );
  }

  return <>{children}</>;
}
