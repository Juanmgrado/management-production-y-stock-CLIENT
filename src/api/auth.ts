import type { User } from "../types/types";
import { ApiError, apiFetch } from "./client";

type Credentials = {
  email: string;
  password: string;
};

export const getMe = async (): Promise<User | null> => {
  try {
    return await apiFetch<User>("/auth/me");
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
};

export const login = (credentials: Credentials) =>
  apiFetch<void>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const logout = () => apiFetch<void>("/auth/logout", { method: "POST" });
