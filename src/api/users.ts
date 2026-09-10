import type {
  CreateUserInput,
  UpdateUserInput,
  User,
  UserFilters,
} from "../types/types";
import { apiFetch, apiFetchPage, type Page } from "./client";

export const getUsers = (filters: UserFilters = {}): Promise<Page<User>> => {
  const params = new URLSearchParams();

  if (filters.name) params.set("name", filters.name);
  if (filters.email) params.set("email", filters.email);

  if (filters.role && filters.role !== "all")
    params.set("isAdmin", String(filters.role === "admin"));

  const status = filters.status ?? "active";
  if (status !== "all") params.set("isActive", String(status === "active"));

  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.order) params.set("order", filters.order);
  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.limit !== undefined) params.set("limit", String(filters.limit));

  return apiFetchPage<User>(`/users?${params.toString()}`);
};

export const createUser = (input: CreateUserInput) =>
  apiFetch<User>("/users", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const updateUser = (uuid: string, input: UpdateUserInput) =>
  apiFetch<User>(`/users/${uuid}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });

export const deleteUser = (uuid: string) =>
  apiFetch<User>(`/users/${uuid}`, { method: "DELETE" });

export const reactivateUser = (uuid: string) =>
  apiFetch<User>(`/users/${uuid}/reactivate`, { method: "PATCH" });
