const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("The backend API URL is not configured.");
  }

  return apiUrl;
};

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

async function readResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Invalid email or password, or your session has expired.",
      );
    }

    if (response.status === 403) {
      throw new Error("Your account is awaiting administrator approval.");
    }

    if (response.status === 429) {
      throw new Error("Too many attempts. Please try again later.");
    }

    throw new Error(
      Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message || "Something went wrong. Please try again.",
    );
  }

  return data as T;
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const fullName =
    `${payload.firstName.trim()} ${payload.lastName.trim()}`.trim();

  const response = await fetch(`${getApiUrl()}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName,
      email: payload.email.trim(),
      password: payload.password,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 409) {
      throw new Error("An account with this email already exists.");
    }

    if (response.status === 429) {
      throw new Error("Too many signup attempts. Please try again later.");
    }

    throw new Error(
      Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message || "Unable to create your account. Please try again.",
    );
  }

  return data as SignupResponse;
}

export async function login(payload: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  const response = await fetch(`${getApiUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: payload.email.trim(),
      password: payload.password,
    }),
  });

  return readResponse<AuthUser>(response);
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response = await fetch(`${getApiUrl()}/auth/me`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return readResponse<AuthUser>(response);
}

export async function refreshSession(): Promise<AuthUser> {
  const response = await fetch(`${getApiUrl()}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  return readResponse<AuthUser>(response);
}

export async function logout(): Promise<void> {
  const response = await fetch(`${getApiUrl()}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to log out. Please try again.");
  }
}
