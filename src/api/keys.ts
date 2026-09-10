import type { ProductFilters, UserFilters } from "../types/types";

export const authMeKey = ["auth", "me"] as const;

export const productsKey = ["products"] as const;
export const productsListKey = (filters: ProductFilters = {}) =>
  [...productsKey, filters] as const;

export const usersKey = ["users"] as const;
export const usersListKey = (filters: UserFilters = {}) =>
  [...usersKey, filters] as const;
