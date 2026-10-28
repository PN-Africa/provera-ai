"use client";

import { TransactionFilters } from "@/components/(dashboard)/transactions/transaction-filters";
import { TransactionTable } from "@/components/(dashboard)/transactions/transaction-table";
import { TransactionDisclaimer } from "@/components/(dashboard)/transactions/transaction-disclaimer";
import { TransactionsHeader } from "@/components/(dashboard)/transactions/transaction-header";
import { useTransactionFilters } from "@/hooks/use-transaction-filters";
import { useTransactions } from "@/components/(dashboard)/transactions/transaction-context";

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
    <div className="min-h-screen bg-black  text-[#EDEFFF] ">
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
