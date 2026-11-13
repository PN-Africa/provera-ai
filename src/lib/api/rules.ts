const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("The backend API URL is not configured.");
  }

  return API_URL;
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
      response = await request();
    }
  }

  return response;
}

async function readError(response: Response, fallback: string): Promise<never> {
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

export type DetectionRule = {
  ruleKey: string;
  version: number;
  name: string;
  type: string;
  params: Record<string, unknown>;
  weight: number;
  isActive: boolean;
  savedAt: string;
  allowedParams: string[];
};

export type DetectionRuleWithHistory = DetectionRule & {
  history: DetectionRule[];
};

export type UpdateDetectionRuleInput = {
  version: number;
  name: string;
  params: Record<string, unknown>;
  weight: number;
};

export async function getDetectionRules(): Promise<DetectionRule[]> {
  const response = await authenticatedFetch("/rules", {
    method: "GET",
  });

  if (!response.ok) {
    await readError(response, "Unable to load detection rules.");
  }

  return response.json();
}

export async function getDetectionRule(
  ruleKey: string,
): Promise<DetectionRuleWithHistory> {
  const response = await authenticatedFetch(
    `/rules/${encodeURIComponent(ruleKey)}`,
    { method: "GET" },
  );

  if (!response.ok) {
    await readError(response, "Unable to load this detection rule.");
  }

  return response.json();
}

export async function updateDetectionRule(
  ruleKey: string,
  input: UpdateDetectionRuleInput,
): Promise<DetectionRule> {
  const response = await authenticatedFetch(
    `/rules/${encodeURIComponent(ruleKey)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    await readError(response, "Unable to update this detection rule.");
  }

  return response.json();
}

export async function activateDetectionRule(
  ruleKey: string,
): Promise<DetectionRule> {
  const response = await authenticatedFetch(
    `/rules/${encodeURIComponent(ruleKey)}/activate`,
    { method: "POST" },
  );

  if (!response.ok) {
    await readError(response, "Unable to activate this detection rule.");
  }

  return response.json();
}

export async function deactivateDetectionRule(
  ruleKey: string,
): Promise<DetectionRule> {
  const response = await authenticatedFetch(
    `/rules/${encodeURIComponent(ruleKey)}/deactivate`,
    { method: "POST" },
  );

  if (!response.ok) {
    await readError(response, "Unable to deactivate this detection rule.");
  }

  return response.json();
}
