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
import { getDetectionRules, type DetectionRule } from "@/lib/api/rules";
import { getWorkspaceMembers } from "@/lib/api/users";
import { OverviewStats } from "./overview-stats";
import { ManagementSections } from "./management-sections";

type OverviewData = {
  totalAnalysts: number;
  activeAnalysts: number;
  rules: DetectionRule[];
};

export function AdminOverview() {
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only the totals are needed, so each count asks for a single row
    Promise.all([
      getWorkspaceMembers(1, 1),
      getWorkspaceMembers(1, 1, "ACTIVE"),
      getDetectionRules(),
    ])
      .then(([all, active, rules]) =>
        setOverview({
          totalAnalysts: all.total,
          activeAnalysts: active.total,
          rules,
        }),
      )
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
      ) : overview ? (
        <OverviewStats {...overview} />
      ) : null}

      <ManagementSections />

      <p className="text-xs leading-5 text-[#A8ADB8]">
        A flag requires review; it does not confirm fraud.
      </p>
    </div>
  );
}
