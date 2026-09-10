import type {
  CreateProductInput,
  Product,
  ProductFilters,
  UpdateProductInput,
} from "../types/types";
import { apiFetch, apiFetchPage, type Page } from "./client";

export const getProducts = (
  filters: ProductFilters = {},
): Promise<Page<Product>> => {
  const params = new URLSearchParams();

  const status = filters.status ?? "active";
  if (status !== "all") params.set("isActive", String(status === "active"));

  if (filters.name) params.set("name", filters.name);
  if (filters.minStock !== undefined)
    params.set("minStock", String(filters.minStock));
  if (filters.maxStock !== undefined)
    params.set("maxStock", String(filters.maxStock));
  if (filters.sortBy) params.set("sortBy", filters.sortBy);
  if (filters.order) params.set("order", filters.order);
  if (filters.createdBy) params.set("createdBy", filters.createdBy);
  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.limit !== undefined) params.set("limit", String(filters.limit));

  return apiFetchPage<Product>(`/products?${params.toString()}`);
};

export const createProduct = (input: CreateProductInput) =>
  apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(input),
  });

export const updateProduct = (uuid: string, input: UpdateProductInput) =>
  apiFetch<Product>(`/products/${uuid}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });

export const deleteProduct = (uuid: string) =>
  apiFetch<Product>(`/products/${uuid}`, { method: "DELETE" });
