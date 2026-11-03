// import { OverviewStats } from "./overview-stats";
// import { ManagementSections } from "./management-sections";

// export function AdminOverview() {
//   return (
//     <div className="mx-auto w-full max-w-[1440px] space-y-6">
//       <header>
//         <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
//           Admin overview
//         </h1>

//         <p className="mt-2 max-w-3xl text-sm leading-6 text-[#A8ADB8]">
//           Manage access, transaction inputs and the settings behind every
//           analysis.
//         </p>
//       </header>

//       <OverviewStats />

//       <ManagementSections />

//       <p className="text-xs leading-5 text-[#A8ADB8]">
//         Example workspace data · A flag requires review; it does not confirm
//         fraud.
//       </p>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  getWorkspaceMembers,
  type WorkspaceMembersResponse,
} from "@/lib/api/users";
import { OverviewStats } from "./overview-stats";
import { ManagementSections } from "./management-sections";

export function AdminOverview() {
  const [membersResponse, setMembersResponse] =
    useState<WorkspaceMembersResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkspaceMembers()
      .then(setMembersResponse)
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Unable to load overview.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-[#EDEFFF] sm:text-4xl">
          Admin overview
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#A8ADB8]">
          Manage access, transaction inputs and the settings behind every
          analysis.
        </p>
      </header>

      {loading ? (
        <p className="text-sm text-[#A8ADB8]">Loading overview…</p>
      ) : error ? (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : membersResponse ? (
        <OverviewStats membersResponse={membersResponse} />
      ) : null}

      <ManagementSections />

      <p className="text-xs leading-5 text-[#A8ADB8]">
        A flag requires review; it does not confirm fraud.
      </p>
    </div>
  );
}
