import { queryClient } from "../lib/queryClient";
import { authMeKey } from "./keys";

const BASE_URL = import.meta.env.VITE_API_URL;

const NO_REFRESH_PATHS = ["/auth/login", "/auth/refresh", "/auth/logout"];

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const toApiError = async (response: Response): Promise<ApiError> => {
  const body = await response.json().catch(() => ({}));
  const message = Array.isArray(body.message)
    ? body.message.join(". ")
    : body.message;
  return new ApiError(response.status, message ?? `Error ${response.status}`);
};

export const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const request = () =>
    fetch(`${BASE_URL}${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    });

  let response = await request();

  if (response.status === 401 && !NO_REFRESH_PATHS.includes(path)) {
    const refreshed = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshed.ok) {
      response = await request();
    } else if (!path.startsWith("/auth/")) {
      queryClient.setQueryData(authMeKey, null);
    }
  }

  if (!response.ok) {
    throw await toApiError(response);
  }

  const json = await response.json();
  return json.data as T;
};
