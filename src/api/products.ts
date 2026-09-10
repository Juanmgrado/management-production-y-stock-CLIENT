import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../types/types";
import { apiFetch } from "./client";

export const getProducts = () => apiFetch<Product[]>("/products");

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
