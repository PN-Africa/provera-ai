"use client";

import { useEffect, useState } from "react";

import {
  getTransactions,
  getDashboardSummary,
  getDashboardTrends,
  type Transaction,
  type DashboardSummary,
  type DashboardTrendPoint,
} from "@/lib/api/upload";
import OverviewStats from "./overview-stat-card";
import TransactionActivity from "./transaction-activity";
import RiskDistribution from "./risk-distribution";
import AttentionTable from "./attention-table";
import { OverviewHeader } from "./overview-header";
import ReviewProgress from "./review-progress";
import TopDetectionRules from "./top-detection-rules";
type OverviewPageContentProps = {
  from?: string;
  to?: string;
  portal: "client" | "admin";
};

async function getAllTransactions(
  from?: string,
  to?: string,
): Promise<Transaction[]> {
  const limit = 100;
  let page = 1;
  const allTransactions: Transaction[] = [];

  while (true) {
    const response = await getTransactions({
      page,
      limit,
      from,
      to,
    });

    allTransactions.push(...response.data);

    if (!response.hasNextPage) {
      break;
    }

    page += 1;
  }

  return allTransactions;
}

export default function OverviewPageContent({
  from,
  to,
  portal,
}: OverviewPageContentProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [trendPoints, setTrendPoints] = useState<DashboardTrendPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState(from ?? "");
  const [toDate, setToDate] = useState(to ?? "");
  const [interval, setInterval] = useState<"day" | "week">("day");

  useEffect(() => {
    let cancelled = false;

    async function loadOverview() {
      setLoading(true);
      setError(null);

      try {
        const filters = {
          from: fromDate || undefined,
          to: toDate || undefined,
        };

        const [summaryResponse, allTransactions, trendsResponse] =
          await Promise.all([
            getDashboardSummary(filters),
            getAllTransactions(filters.from, filters.to),
            getDashboardTrends({
              ...filters,
              interval,
            }),
          ]);

        if (cancelled) return;

        setSummary(summaryResponse);
        setTrendPoints(trendsResponse.points);
        setTransactions(allTransactions);
        console.log("FULL DASHBOARD SUMMARY:", summaryResponse);
        console.log("TOP INDICATORS:", summaryResponse.topIndicators);
        console.log("REVIEW COUNTS:", summaryResponse.reviews);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error ? err.message : "Unable to load dashboard data.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadOverview();

    return () => {
      cancelled = true;
    };
  }, [fromDate, toDate, interval]);

  if (loading) {
    return <p>Loading overview...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }
  // const fourDaysAgo = new Date(today);
  // fourDaysAgo.setDate(today.getDate() - 3);
  if (!summary) {
    return <p>No dashboard summary available.</p>;
  }

  return (
    <div className="space-y-6">
      <OverviewHeader />

      <OverviewStats summary={summary} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <TransactionActivity
          points={trendPoints}
          interval={interval}
          onIntervalChange={setInterval}
        />

        {/* <RiskDistribution transactions={transactions} /> */}
        <RiskDistribution riskLevels={summary.riskLevels} />
      </div>
      <div className="">
        {/* <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2"> */}
        {/* <ReviewProgress reviews={summary.reviews} /> */}

        <TopDetectionRules indicators={summary.topIndicators ?? []} />
      </div>

      <AttentionTable transactions={transactions} portal={portal} />
    </div>
  );
}
