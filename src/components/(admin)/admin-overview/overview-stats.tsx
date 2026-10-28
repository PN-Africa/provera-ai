import { OverviewStatCard } from "./overview-stat-card";

const stats = [
  {
    title: "Active users",
    value: "8",
    description: "2 administrators · 5 analysts · 1 viewer",
  },
  {
    title: "Data sources",
    value: "2",
    description: "CSV upload and sample dataset",
  },
  {
    title: "Enabled rules",
    value: "3",
    description: "Applied to new analyses",
  },
  {
    title: "Configuration",
    value: "v1.4",
    description: "Last updated 22 Oct · 09:45 UTC",
  },
];

export function OverviewStats() {
  return (
    <section
      aria-label="Workspace statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <OverviewStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          description={stat.description}
        />
      ))}
    </section>
  );
}
