import { apiClient } from "./client";

export type AuditLog = {
  id: string;
  occurredAt: string;
  actorId: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  ip?: string | null;
  prevHash?: string;
  hash?: string;
};

export type AuditLogsResponse = {
  data: AuditLog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function getAuditLogs(
  page = 1,
  limit = 50,
): Promise<AuditLogsResponse> {
  const response = await apiClient.get<AuditLogsResponse>("/audit-logs", {
    params: { page, limit },
  });

  return response.data;
}
export async function getAllAuditLogs(): Promise<AuditLog[]> {
  const firstPage = await getAuditLogs(1, 50);
  const logs = [...firstPage.data];

  for (let page = 2; page <= firstPage.totalPages; page++) {
    const response = await getAuditLogs(page, 50);
    logs.push(...response.data);
  }

  return logs;
}
