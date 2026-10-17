import { apiClient } from "./client";

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: string;
  riskLevel?: "low" | "medium" | "high";
  createdAt: string;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get<Transaction[]>("/transactions");

  return response.data;
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  const response = await apiClient.get<Transaction>(`/transactions/${id}`);

  return response.data;
};
