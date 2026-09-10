import type { ProductFilters } from "../types/types";

export const authMeKey = ["auth", "me"] as const;

export const productsKey = ["products"] as const;
export const productsListKey = (filters: ProductFilters = {}) =>
  [...productsKey, filters] as const;
