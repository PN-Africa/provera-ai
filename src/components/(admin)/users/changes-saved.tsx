"use client";

import { useRouter } from "next/navigation";

export function ChangesSaved() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Changes saved
        </h1>

        <p className="mt-2 text-sm text-[#A8ADB8]">
          The workspace has been updated successfully.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          Your changes are recorded
        </h2>

        <p className="mt-3 text-sm text-[#A8ADB8]">
          Review the audit trail in platform activity.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/admin-overview")}
            className="min-h-12 rounded-lg bg-[#34E89A] px-5 text-sm font-medium text-black transition hover:bg-[#90EFC5]"
          >
            Admin overview
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/platform-activity")}
            className="min-h-12 rounded-lg border border-[#393943] px-5 text-sm text-[#EDEFFF] transition hover:bg-[#292930]"
          >
            View activity
          </button>
        </div>
      </section>
    </div>
  );
}
