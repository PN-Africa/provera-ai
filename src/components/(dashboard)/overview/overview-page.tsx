"use client";

import { useEffect, useState } from "react";
import { getTransactions } from "@/lib/api/upload";
import type { Transaction } from "@/lib/api/upload";

import { DatasetFilters } from "@/components/(dashboard)/overview/dataset-filters";

import TransactionActivity from "@/components/(dashboard)/overview/transaction-activity";
import RiskDistribution from "@/components/(dashboard)/overview/risk-distribution";
import AttentionTable from "@/components/(dashboard)/overview/attention-table";
import { OverviewHeader } from "./overview-header";
import OverviewStats from "./overview-stat-card";

type OverviewPageContentProps = {
  portal?: "client" | "admin";
};

export default function OverviewPageContent({
  portal = "client",
}: OverviewPageContentProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOverview() {
      try {
        setLoading(true);
        setError(null);

        const response = await getTransactions({
          page: 1,
          limit: 20,
          from: fromDate || undefined,
          to: toDate || undefined,
        });

        if (cancelled) return;

        setTransactions(response.data);
        setTotalTransactions(response.total);
      } catch (err) {
        if (cancelled) return;

        setError(
          err instanceof Error
            ? err.message
            : "Could not load transaction data.",
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOverview();

    return () => {
      cancelled = true;
    };
  }, [fromDate, toDate]);

  return (
    <div className="min-h-screen bg-black text-[#EDEFFF]">
      <OverviewHeader portal={portal} />

      <DatasetFilters
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      {loading ? (
        <p className="text-sm ">Loading overview...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <>
          <OverviewStats
            transactions={transactions}
            totalTransactions={totalTransactions}
          />

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
            <TransactionActivity transactions={transactions} />
            <RiskDistribution transactions={transactions} />
          </div>

          <AttentionTable transactions={transactions} portal={portal} />
        </>
      )}
    </div>
  );
}
