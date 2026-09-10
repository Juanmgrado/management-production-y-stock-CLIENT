import type {
  Movement,
  MovementFilters,
  MovementListItem,
  RegisterMovementInput,
} from "../types/types";
import { apiFetch, apiFetchPage, type Page } from "./client";

export const getMovements = (
  filters: MovementFilters = {},
): Promise<Page<MovementListItem>> => {
  const params = new URLSearchParams();
  if (filters.productUuid) params.set("productUuid", filters.productUuid);
  if (filters.movementType) params.set("movementType", filters.movementType);
  if (filters.startDate) params.set("startDate", filters.startDate);
  if (filters.endDate) params.set("endDate", filters.endDate);
  if (filters.page !== undefined) params.set("page", String(filters.page));
  if (filters.limit !== undefined) params.set("limit", String(filters.limit));

  return apiFetchPage<MovementListItem>(`/movements?${params.toString()}`);
};

export const registerMovement = (
  productUuid: string,
  input: RegisterMovementInput,
) =>
  apiFetch<Movement>(`/movements/${productUuid}`, {
    method: "POST",
    body: JSON.stringify(input),
  });
