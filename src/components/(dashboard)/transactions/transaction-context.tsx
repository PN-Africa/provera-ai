"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { transactions as initialTransactions } from "./transaction-data";
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
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const [reviews, setReviews] = useState<Record<string, TransactionReview>>({});

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
