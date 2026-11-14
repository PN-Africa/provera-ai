import { authenticatedFetch } from "./client";

async function readError(response: Response, fallback: string) {
  const data = await response.json().catch(() => null);

  if (response.status === 401) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  if (response.status === 403) {
    throw new Error(
      data?.message || "You do not have permission to perform this action.",
    );
  }

  throw new Error(data?.message || fallback);
}

// Analyst accounts. Admin accounts are never listed.
export type WorkspaceMember = {
  id: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "ANALYST";
  status: "ACTIVE" | "DEACTIVATED";
  lastActive: string | null;
  createdAt: string;
};

export type WorkspaceMembersResponse = {
  data: WorkspaceMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export async function getWorkspaceMembers(
  page = 1,
  limit = 20,
  status?: WorkspaceMemberStatus,
): Promise<WorkspaceMembersResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(status ? { status } : {}),
  });

  const response = await authenticatedFetch(`/users?${params}`, {
    method: "GET",
  });

  if (!response.ok) {
    await readError(response, "Unable to load workspace members.");
  }

  return response.json();
}
export async function getAllWorkspaceMembers(): Promise<WorkspaceMember[]> {
  const firstPage = await getWorkspaceMembers(1, 100);
  const members = [...firstPage.data];

  for (let page = 2; page <= firstPage.totalPages; page++) {
    const response = await getWorkspaceMembers(page, 100);
    members.push(...response.data);
  }

  return members;
}
export type WorkspaceMemberStatus = "ACTIVE" | "DEACTIVATED";

// Deactivating signs the analyst out everywhere at once and blocks login
export async function updateMemberStatus(
  id: string,
  status: WorkspaceMemberStatus,
): Promise<WorkspaceMember> {
  const action = status === "ACTIVE" ? "activate" : "deactivate";
  const response = await authenticatedFetch(
    `/users/${encodeURIComponent(id)}/${action}`,
    { method: "POST" },
  );

  if (!response.ok) {
    await readError(response, "Unable to update this member's status.");
  }

  return response.json();
}

export function deactivateMember(id: string): Promise<WorkspaceMember> {
  return updateMemberStatus(id, "DEACTIVATED");
}

export async function getWorkspaceMemberById(
  id: string,
): Promise<WorkspaceMember> {
  const response = await authenticatedFetch(
    `/users/${encodeURIComponent(id)}`,
    { method: "GET" },
  );

  if (response.status === 404) {
    throw new Error("Workspace member not found.");
  }

  if (!response.ok) {
    await readError(response, "Unable to load this member.");
  }

  return response.json();
}
