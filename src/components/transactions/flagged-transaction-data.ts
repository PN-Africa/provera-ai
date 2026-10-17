import { transactions } from "./transaction-data";

export const flaggedTransactions = transactions.filter(
  (transaction) => transaction.risk !== "Low risk",
);
