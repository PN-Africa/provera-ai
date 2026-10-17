"use client";

import { TransactionFilters } from "@/components/transactions/transaction-filters";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransactionDisclaimer } from "@/components/transactions/transaction-disclaimer";
import { TransactionsHeader } from "@/components/transactions/transaction-header";
import { useTransactionFilters } from "@/hooks/use-transaction-filters";
import { useTransactions } from "@/components/transactions/transaction-context";

export default function FlaggedTransactionsPage() {
  const { transactions } = useTransactions();

  const flaggedTransactions = transactions.filter(
    (transaction) => transaction.risk !== "Low risk",
  );

  const {
    search,
    setSearch,
    riskFilter,
    setRiskFilter,
    sortBy,
    setSortBy,
    filteredTransactions,
  } = useTransactionFilters(flaggedTransactions);

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-[#EDEFFF] sm:px-6 lg:px-10 lg:py-10">
      <TransactionsHeader
        title="Flagged transactions"
        description="Prioritize unusual activity and inspect the evidence."
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
        Showing {filteredTransactions.length} of {flaggedTransactions.length}{" "}
        flagged transactions
      </p>

      <TransactionDisclaimer />
    </div>
  );
}
