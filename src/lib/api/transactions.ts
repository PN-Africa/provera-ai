import { apiClient } from "./client";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type ReviewStatus = "OPEN" | "IN_REVIEW" | "APPROVED" | "REJECTED";

export interface Transaction {
  id: string;
  transactionId: string;
  uploadId: string;
  amount: number | string;
  currency: string;
  occurredAt: string;
  type: string;
  customerId?: string | null;
  paymentMethod?: string | null;
  location?: string | null;
  riskScore: number;
  riskLevel: RiskLevel;
  flagged: boolean;
  reviewStatus: ReviewStatus | null;
  review?: unknown;
}

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetTransactionsParams {
  page?: number;
  limit?: number;
  riskLevel?: RiskLevel;
  flagged?: boolean;
  reviewStatus?: ReviewStatus;
  mine?: boolean;
  uploadId?: string;
  customerId?: string;
  type?: string;
  from?: string;
  to?: string;
}

export const getTransactions = async (
  params: GetTransactionsParams = {},
): Promise<TransactionsResponse> => {
  const response = await apiClient.get<TransactionsResponse>("/transactions", {
    params,
  });

  return response.data;
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  const response = await apiClient.get<Transaction>(
    `/transactions/${encodeURIComponent(id)}`,
  );

  return response.data;
};
