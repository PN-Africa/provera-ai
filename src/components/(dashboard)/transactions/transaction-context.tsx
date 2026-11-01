"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getTransactions,
  type Transaction as ApiTransaction,
} from "@/lib/api/transactions";

import type { Transaction } from "./transaction-table";

export type ReviewStatus = "Pending review" | "Reviewed" | "Escalated";

export interface TransactionReview {
  status: ReviewStatus;
  note: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  reviews: Record<string, TransactionReview>;
  updateReview: (
    transactionId: string,
    updates: Partial<TransactionReview>,
  ) => void;
  isLoading: boolean;
  error: string | null;
  refreshTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

function toTableTransaction(transaction: ApiTransaction): Transaction {
  const riskLabels = {
    HIGH: "High risk",
    MEDIUM: "Medium risk",
    LOW: "Low risk",
  } as const;

  return {
    id: transaction.id,
    amount: `${transaction.currency} ${Number(transaction.amount).toLocaleString()}`,
    risk: riskLabels[transaction.riskLevel],
    date: new Date(transaction.occurredAt).toLocaleString(),
    indicator: transaction.flagged ? "Flagged for review" : "—",
  };
}

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reviews, setReviews] = useState<Record<string, TransactionReview>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getTransactions({ page: 1, limit: 100 });
      setTransactions(response.data.map(toTableTransaction));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load transactions. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void refreshTransactions();
    }, 0);

    return () => clearTimeout(timer);
  }, [refreshTransactions]);

  const updateReview = (
    transactionId: string,
    updates: Partial<TransactionReview>,
  ) => {
    setReviews((currentReviews) => ({
      ...currentReviews,
      [transactionId]: {
        status: currentReviews[transactionId]?.status ?? "Pending review",
        note: currentReviews[transactionId]?.note ?? "",
        ...updates,
      },
    }));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        reviews,
        updateReview,
        isLoading,
        error,
        refreshTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }

  return context;
}
