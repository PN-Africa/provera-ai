import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("The backend API URL is not configured.");
  }

  return API_URL;
}

// The access token lasts 15 minutes; the refresh token renews it. The backend
// rotates the refresh token on every use and treats a second use of the same
// token as theft (it ends every session), so only one refresh may run at a
// time: concurrent callers share it.
let refreshing: Promise<boolean> | null = null;

export function refreshSessionOnce(): Promise<boolean> {
  refreshing ??= fetch(`${getApiUrl()}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  })
    .then(
      (response) => response.ok,
      () => false,
    )
    .finally(() => {
      refreshing = null;
    });

  return refreshing;
}

// fetch with the session cookies; on 401 renews the session once and retries
export async function authenticatedFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const request = () =>
    fetch(`${getApiUrl()}${path}`, {
      cache: "no-store",
      ...options,
      credentials: "include",
    });

  const response = await request();

  if (response.status !== 401) return response;

  return (await refreshSessionOnce()) ? request() : response;
}

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Same renewal for requests made through axios
apiClient.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as
    | (InternalAxiosRequestConfig & { retried?: boolean })
    | undefined;

  if (error.response?.status !== 401 || !config || config.retried) {
    throw error;
  }

  config.retried = true;

  if (!(await refreshSessionOnce())) throw error;

  return apiClient(config);
});
