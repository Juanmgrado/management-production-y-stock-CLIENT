import type { Product } from "../types/types";
import { apiFetch } from "./client";

export const getProducts = () => apiFetch<Product[]>("/products");
