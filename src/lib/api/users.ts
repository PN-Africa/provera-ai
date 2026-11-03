const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("The backend API URL is not configured.");
  }

  return API_URL;
}

export interface PendingAnalyst {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface ApprovedAnalyst {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

async function refreshAuthentication(): Promise<boolean> {
  try {
    const response = await fetch(`${getApiUrl()}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    return response.ok;
  } catch {
    return false;
  }
}

async function authenticatedFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const request = () =>
    fetch(`${getApiUrl()}${path}`, {
      ...options,
      credentials: "include",
      cache: "no-store",
    });

  let response = await request();

  if (response.status === 401) {
    const refreshed = await refreshAuthentication();

    if (refreshed) {
      // Retry only once, after a successful refresh.
      response = await request();
    }
  }

  return response;
}

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

export async function getPendingAnalysts(): Promise<PendingAnalyst[]> {
  const response = await authenticatedFetch("/users/pending", {
    method: "GET",
  });

  if (!response.ok) {
    await readError(response, "Unable to load pending analysts.");
  }

  const data = await response.json();

  // Supports either a direct array or a { data: [...] } response.
  return Array.isArray(data) ? data : data.data;
}

export async function approveAnalyst(
  id: string,
): Promise<{ message: string; account: ApprovedAnalyst }> {
  const response = await authenticatedFetch(
    `/users/${encodeURIComponent(id)}/approve`,
    { method: "POST" },
  );

  if (!response.ok) {
    await readError(response, "Unable to approve this analyst.");
  }

  return response.json();
}

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
): Promise<WorkspaceMembersResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
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

export async function updateMemberStatus(
  id: string,
  status: WorkspaceMemberStatus,
): Promise<WorkspaceMember> {
  const response = await authenticatedFetch(
    `/users/${encodeURIComponent(id)}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    },
  );

  if (!response.ok) {
    await readError(response, "Unable to update this member's status.");
  }

  return response.json();
}

export async function deactivateMember(
  id: string,
): Promise<{ message: string; account: WorkspaceMember }> {
  const response = await authenticatedFetch(
    `/users/${encodeURIComponent(id)}/deactivate`,
    { method: "POST" },
  );

  if (!response.ok) {
    await readError(response, "Unable to deactivate this member.");
  }

  return response.json();
}
