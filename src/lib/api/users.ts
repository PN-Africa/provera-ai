// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// function getApiUrl() {
//   if (!API_URL) {
//     throw new Error("The backend API URL is not configured.");
//   }

//   return API_URL;
// }

// export interface PendingAnalyst {
//   id: string;
//   fullName: string;
//   email: string;
//   createdAt: string;
// }

// export interface ApprovedAnalyst {
//   id: string;
//   fullName: string;
//   email: string;
//   role: string;
// }

// // export async function getPendingAnalysts(): Promise<PendingAnalyst[]> {
// //   const response = await fetch(`${getApiUrl()}/users/pending`, {
// //     method: "GET",
// //     credentials: "include",
// //     cache: "no-store",
// //   });

// //   const data = await response.json().catch(() => null);

// //   if (!response.ok) {
// //     if (response.status === 401) {
// //       throw new Error("Your session has expired. Please sign in again.");
// //     }

// //     if (response.status === 403) {
// //       throw new Error("Only administrators can view pending analysts.");
// //     }

// //     throw new Error(data?.message || "Unable to load pending analysts.");
// //   }

// //   return data as PendingAnalyst[];
// // }

// export async function getPendingAnalysts(): Promise<PendingAnalyst[]> {
//   const response = await fetch(`${getApiUrl()}/users/pending`, {
//     method: "GET",
//     credentials: "include",
//     cache: "no-store",
//   });

//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     if (response.status === 401) {
//       throw new Error(
//         "Your session has expired or you are not authenticated. Please sign in again.",
//       );
//     }

//     if (response.status === 403) {
//       throw new Error("Only administrators can view pending analysts.");
//     }

//     throw new Error(data?.message || "Unable to load pending analysts.");
//   }

//   return data as PendingAnalyst[];
// }
// export async function approveAnalyst(
//   id: string,
// ): Promise<{ message: string; account: ApprovedAnalyst }> {
//   const response = await fetch(
//     `${getApiUrl()}/users/${encodeURIComponent(id)}/approve`,
//     {
//       method: "POST",
//       credentials: "include",
//     },
//   );

//   const data = await response.json().catch(() => null);

//   if (!response.ok) {
//     throw new Error(data?.message || "Unable to approve this analyst.");
//   }

//   return data;
// }

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
