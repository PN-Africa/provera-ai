"use client";

import { useMemo, useState } from "react";

import {
  TransactionFilters,
  type RiskFilter,
  type TransactionSort,
} from "@/components/transactions/transaction-filters";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransactionDisclaimer } from "@/components/transactions/transaction-disclaimer";
import { TransactionsHeader } from "@/components/transactions/transaction-header";
import { useTransactions } from "@/components/transactions/transaction-context";

export default function TransactionsPage() {
  const { transactions } = useTransactions();

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("All");
  const [sortBy, setSortBy] = useState<TransactionSort>("highest-risk");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    const riskRank: Record<string, number> = {
      "High risk": 3,
      "Medium risk": 2,
      "Low risk": 1,
    };

    const result = transactions.filter((transaction) => {
      const matchesSearch = String(transaction.id)
        .toLowerCase()
        .includes(query);

      const matchesRisk =
        riskFilter === "All" || transaction.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "highest-risk") {
        return (riskRank[b.risk] ?? 0) - (riskRank[a.risk] ?? 0);
      }

      if (sortBy === "lowest-risk") {
        return (riskRank[a.risk] ?? 0) - (riskRank[b.risk] ?? 0);
      }

      const parseDate = (date: string) =>
        new Date(date.replace(",", " 2026,")).getTime();

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      if (sortBy === "newest") return dateB - dateA;
      if (sortBy === "oldest") return dateA - dateB;

      return 0;
    });
  }, [transactions, search, riskFilter, sortBy]);

  return (
    <div className="min-h-screen bg-black px-10 py-10 text-[#EDEFFF]">
      <TransactionsHeader
        title="All transactions"
        description="Search and review your selected dataset."
      />

      <TransactionFilters
        search={search}
        onSearchChange={setSearch}
        riskFilter={riskFilter}
        onRiskFilterChange={setRiskFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <TransactionTable transactions={filteredTransactions} />

      <p className="mt-6 font-sans text-[12px] font-medium leading-[18px] text-[#B7B9CB]">
        Showing {filteredTransactions.length} of {transactions.length}{" "}
        transactions
      </p>

      <TransactionDisclaimer />
    </div>
  );
}
