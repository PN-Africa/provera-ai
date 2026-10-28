"use client";

import { useRouter } from "next/navigation";

const permissions = [
  ["View transactions & explanations", true, true, true],
  ["Upload and analyze transactions", true, true, false],
  ["Manage users and permissions", true, false, false],
  ["Manage sources, rules & thresholds", true, false, false],
  ["View platform activity", true, false, false],
  ["Manage platform settings", true, false, false],
] as const;

export function RolePermissions() {
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-[#EDEFFF] sm:text-4xl">
          Role permissions
        </h1>
        <p className="mt-2 text-sm text-[#A8ADB8]">
          Use the least access a member needs for their work.
        </p>
      </header>

      <section className="rounded-xl border border-[#393943] bg-[#202027] p-5 sm:p-6">
        <h2 className="text-lg font-medium text-[#EDEFFF]">
          Permission matrix
        </h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[650px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="bg-[#292930] text-xs text-[#B7B9CB]">
                {["Capability", "Administrator", "Analyst", "Viewer"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="border-y border-[#393943] px-3 py-4 font-normal first:rounded-l-xl first:border-l last:rounded-r-xl last:border-r"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {permissions.map(([capability, admin, analyst, viewer]) => (
                <tr key={capability} className="text-sm text-[#EDEFFF]">
                  <td className="px-3 py-4">{capability}</td>
                  {[admin, analyst, viewer].map((allowed, index) => (
                    <td
                      key={index}
                      className={`px-3 py-4 ${allowed && index === 2 ? "text-[#34E89A]" : "text-[#EDEFFF]"}`}
                    >
                      {allowed ? "Allowed" : "No access"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={() => router.push("/admin/users-and-access")}
          className="mt-5 min-h-12 rounded-lg border border-[#393943] px-5 text-sm text-white hover:bg-[#292930]"
        >
          Back to users
        </button>
      </section>
    </div>
  );
}
