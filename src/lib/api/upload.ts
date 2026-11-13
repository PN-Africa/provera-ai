const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("The backend API URL is not configured.");
  }

  return API_URL;
}

async function readResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    if (response.status === 403) {
      throw new Error("Only administrators can perform this action.");
    }

    if (response.status === 409) {
      throw new Error(
        data?.message || "This operation cannot be completed right now.",
      );
    }

    if (response.status === 413) {
      throw new Error("The CSV file exceeds the 5 MB upload limit.");
    }

    throw new Error(data?.message || "Something went wrong. Please try again.");
  }

  return data as T;
}

export type UploadStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface UploadResponse {
  uploadId: string;
  status: UploadStatus;
}

export interface TransactionUpload {
  id?: string;
  uploadId?: string;
  fileName?: string;
  filename?: string;
  status: UploadStatus;

  totalRows?: number;
  acceptedRows?: number;
  rejectedRows?: number;
  flaggedRows?: number;

  error?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// export interface UploadListResponse {
//   uploads: TransactionUpload[];
//   total?: number;
//   page?: number;
//   limit?: number;
// }

export interface UploadListResponse {
  data: TransactionUpload[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RejectedUploadRow {
  id: string;
  createdAt: string;
  updatedAt: string;
  uploadId: string;
  rowNumber: number;
  transactionId: string | null;
  reasons: string[];
}

export interface RejectedRowsResponse {
  data: RejectedUploadRow[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ScoreUploadsResponse {
  uploads: number;
  scored: number;
  flagged: number;
  skippedReviewed: number;
}

export interface RescoreResponse {
  uploads: number;
  scored: number;
  flagged: number;
  skippedReviewed: number;
}

// Upload a transaction CSV
export async function uploadTransactions(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getApiUrl()}/uploads`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return readResponse<UploadResponse>(response);
}

export async function getUploads(
  page = 1,
  limit = 20,
): Promise<UploadListResponse> {
  const response = await fetch(
    `${getApiUrl()}/uploads?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return readResponse<UploadListResponse>(response);
}

// Get a specific upload
export async function getUpload(id: string): Promise<TransactionUpload> {
  const response = await fetch(
    `${getApiUrl()}/uploads/${encodeURIComponent(id)}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return readResponse<TransactionUpload>(response);
}

// Get rejected rows
export async function getRejectedRows(
  id: string,
  page = 1,
  limit = 20,
): Promise<RejectedRowsResponse> {
  const response = await fetch(
    `${getApiUrl()}/uploads/${encodeURIComponent(id)}/rejected?page=${page}&limit=${limit}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return readResponse<RejectedRowsResponse>(response);
}

// Score all unscored transactions
export async function scoreUnscoredUploads(): Promise<ScoreUploadsResponse> {
  const response = await fetch(`${getApiUrl()}/uploads/score-unscored`, {
    method: "POST",
    credentials: "include",
  });

  return readResponse<ScoreUploadsResponse>(response);
}

// Rescore a specific upload
export async function rescoreUpload(id: string): Promise<RescoreResponse> {
  const response = await fetch(
    `${getApiUrl()}/uploads/${encodeURIComponent(id)}/rescore`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  return readResponse<RescoreResponse>(response);
}
export type Transaction = {
  id: string;
  transactionId: string;
  uploadId: string;
  amount: string;
  currency: string;
  uploadedAt: string;
  occurredAt: string;
  type: string;
  customerId: string;
  paymentMethod: string;
  location: string;
  riskScore: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  flagged: boolean;
  reviewStatus: "OPEN" | "IN_REVIEW" | "CLOSED" | null;
  review: unknown | null;
};

export type TransactionListResponse = {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type TransactionFilters = {
  page?: number;
  limit?: number;
  riskLevel?: "LOW" | "MEDIUM" | "HIGH";
  flagged?: boolean;
  reviewStatus?: "OPEN" | "IN_REVIEW" | "CLOSED";
  mine?: boolean;
  uploadId?: string;
  customerId?: string;
  type?: string;
  from?: string;
  to?: string;
};

export async function getTransactions(
  filters: TransactionFilters = {},
): Promise<TransactionListResponse> {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  const response = await fetch(
    `${getApiUrl()}/transactions?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return readResponse<TransactionListResponse>(response);
}

// export type DashboardSummary = {
//   transactions: {
//     total: number;
//     scored: number;
//     flagged: number;
//     flaggedPercent: number;
//   };
//   riskLevels: Record<string, number>;
//   reviewProgress: {
//     open: number;
//     inReview: number;
//     closed: number;
//     cleared: number;
//     escalated: number;
//   };
//   topRules: Array<{
//     rule: string;
//     count: number;
//   }>;
// };

export type DashboardSummary = {
  from: string;
  to: string;

  transactions: {
    total: number;
    scored: number;
    flagged: number;
    flaggedPercent: number;
  };

  riskLevels: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
  };

  reviews: {
    open: number;
    closed: number;
    cleared: number;
    escalated: number;
  };

  topIndicators: Array<{
    ruleName: string;
    count: number;
    percentOfScored: number;
  }>;
};

export type DashboardTrendPoint = {
  period: string;
  total: number;
  flagged: number;
  high: number;
};

export type DashboardTrends = {
  from: string;
  to: string;
  interval: "day" | "week";
  timeZone: string;
  points: DashboardTrendPoint[];
};

export async function getDashboardSummary(
  filters: { from?: string; to?: string } = {},
): Promise<DashboardSummary> {
  const params = new URLSearchParams();

  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);

  const query = params.toString();
  const response = await fetch(
    `${getApiUrl()}/dashboard/summary${query ? `?${query}` : ""}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return readResponse<DashboardSummary>(response);
}

export async function getDashboardTrends(
  filters: { from?: string; to?: string; interval?: "day" | "week" } = {},
): Promise<DashboardTrends> {
  const params = new URLSearchParams();

  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  params.set("interval", filters.interval ?? "day");

  const response = await fetch(
    `${getApiUrl()}/dashboard/trends?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return readResponse<DashboardTrends>(response);
}
