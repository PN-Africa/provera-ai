"use client";

import { useMemo, useState } from "react";
// import type { Transaction } from "@/components/transactions/transaction-data";
import type {
  RiskFilter,
  TransactionSort,
} from "@/components/transactions/transaction-filters";
import { Transaction } from "@/components/transactions/transaction-table";

export function useTransactionFilters(data: Transaction[]) {
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

    const filtered = data.filter((transaction) => {
      const matchesSearch = String(transaction.id)
        .toLowerCase()
        .includes(query);

      const matchesRisk =
        riskFilter === "All" || transaction.risk === riskFilter;

      return matchesSearch && matchesRisk;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "highest-risk") {
        return (riskRank[b.risk] ?? 0) - (riskRank[a.risk] ?? 0);
      }

      if (sortBy === "lowest-risk") {
        return (riskRank[a.risk] ?? 0) - (riskRank[b.risk] ?? 0);
      }

      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      if (sortBy === "newest") return dateB - dateA;
      if (sortBy === "oldest") return dateA - dateB;

      return 0;
    });
  }, [data, search, riskFilter, sortBy]);

  return {
    search,
    setSearch,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    filteredTransactions,
  };
}
