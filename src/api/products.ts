import type {
  CreateProductInput,
  Product,
  ProductFilters,
  UpdateProductInput,
} from "../types/types";
import { apiFetch } from "./client";

export const getProducts = (filters: ProductFilters = {}) => {
  const params = new URLSearchParams({ isActive: "true" });
  if (filters.name) params.set("name", filters.name);
  if (filters.minStock !== undefined)
    params.set("minStock", String(filters.minStock));
  if (filters.maxStock !== undefined)
    params.set("maxStock", String(filters.maxStock));

  return apiFetch<Product[]>(`/products?${params.toString()}`);
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
