import { OverviewHeader } from "@/components/(dashboard)/overview/overview-header";
import { DatasetFilters } from "@/components/(dashboard)/overview/dataset-filters";
import { TransactionActivity } from "@/components/(dashboard)/overview/transaction-activity";
import { RiskDistribution } from "@/components/(dashboard)/overview/risk-distribution";
import { AttentionTable } from "@/components/(dashboard)/overview/attention-table";
import { OverviewStats } from "@/components/(dashboard)/overview/overview-stat-card";

type OverviewPageContentProps = {
  portal?: "client" | "admin";
};

export function OverviewPageContent({
  portal = "client",
}: OverviewPageContentProps) {
  return (
    <div className="min-h-screen bg-black text-[#EDEFFF]">
      <OverviewHeader portal={portal} />

      <DatasetFilters />

      <OverviewStats />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <TransactionActivity />
        <RiskDistribution />
      </div>

      <AttentionTable portal={portal} />
    </div>
  );
}
