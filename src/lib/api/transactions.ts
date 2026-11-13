import { apiClient } from "./client";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

// OPEN: flagged and not yet decided. CLOSED: a decision was recorded.
export type ReviewStatus = "OPEN" | "CLOSED";
export interface TransactionIndicator {
  ruleName: string;
  reason: string;
  details?: Record<string, unknown>;
  ruleKey?: string;
  weight?: number;
}
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
  indicators?: TransactionIndicator[];
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

export async function downloadCustomerHistory(
  transactionId: string,
  from?: string,
  to?: string,
): Promise<void> {
  const response = await apiClient.get(
    `/transactions/${encodeURIComponent(transactionId)}/customer-history`,
    {
      params: {
        ...(from ? { from } : {}),
        ...(to ? { to } : {}),
      },
      responseType: "blob",
    },
  );

  const blob = response.data as Blob;

  const contentDisposition = response.headers["content-disposition"];

  const filename =
    contentDisposition?.match(/filename="?([^"]+)"?/i)?.[1] ??
    "customer-transactions.csv";

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}
