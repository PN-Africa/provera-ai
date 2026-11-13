// import { OverviewStatCard } from "./overview-stat-card";

// const stats = [
//   {
//     title: "Active users",
//     value: "8",
//     description: "2 administrators · 5 analysts · 1 viewer",
//   },
//   {
//     title: "Data sources",
//     value: "2",
//     description: "CSV upload and sample dataset",
//   },
//   {
//     title: "Enabled rules",
//     value: "3",
//     description: "Applied to new analyses",
//   },
//   {
//     title: "Configuration",
//     value: "v1.4",
//     description: "Last updated 22 Oct · 09:45 UTC",
//   },
// ];

// export function OverviewStats() {
//   return (
//     <section
//       aria-label="Workspace statistics"
//       className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
//     >
//       {stats.map((stat) => (
//         <OverviewStatCard
//           key={stat.title}
//           title={stat.title}
//           value={stat.value}
//           description={stat.description}
//         />
//       ))}
//     </section>
//   );
// }
import type { DetectionRule } from "@/lib/api/rules";
import { OverviewStatCard } from "./overview-stat-card";

type OverviewStatsProps = {
  totalAnalysts: number;
  activeAnalysts: number;
  rules: DetectionRule[];
};

const formatSavedAt = (iso: string) =>
  `${new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  })} UTC`;

export function OverviewStats({
  totalAnalysts,
  activeAnalysts,
  rules,
}: OverviewStatsProps) {
  const enabledRules = rules.filter((rule) => rule.isActive).length;
  const lastChanged = rules.reduce<DetectionRule | null>(
    (latest, rule) =>
      !latest || rule.savedAt > latest.savedAt ? rule : latest,
    null,
  );

  return (
    <section
      aria-label="Workspace statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      <OverviewStatCard
        title="Active analysts"
        value={activeAnalysts}
        description={`${totalAnalysts} analyst${totalAnalysts === 1 ? "" : "s"} in total`}
      />
      <OverviewStatCard
        title="Enabled rules"
        value={enabledRules}
        description={`${rules.length} detection rules · applied to new analyses`}
      />
      <OverviewStatCard
        title="Rules last changed"
        value={lastChanged ? `v${lastChanged.version}` : "—"}
        description={
          lastChanged
            ? `${lastChanged.name} · ${formatSavedAt(lastChanged.savedAt)}`
            : "No rules yet"
        }
      />
    </section>
  );
}
