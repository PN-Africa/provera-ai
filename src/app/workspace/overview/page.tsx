import { OverviewHeader } from "@/components/overview/overview-header";
import { DatasetFilters } from "@/components/overview/dataset-filters";

import { TransactionActivity } from "@/components/overview/transaction-activity";
import { RiskDistribution } from "@/components/overview/risk-distribution";
import { AttentionTable } from "@/components/overview/attention-table";
import { OverviewStats } from "@/components/overview/overview-stat-card";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-6 lg:px-10 lg:py-10 text-[#EDEFFF]">
      <OverviewHeader />

      <DatasetFilters />

      <OverviewStats />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <TransactionActivity />

        <RiskDistribution />
      </div>

      <AttentionTable />
    </div>
  );
}
