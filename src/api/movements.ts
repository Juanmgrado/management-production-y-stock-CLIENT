import type { Movement, RegisterMovementInput } from "../types/types";
import { apiFetch } from "./client";

export const registerMovement = (
  productUuid: string,
  input: RegisterMovementInput,
) =>
  apiFetch<Movement>(`/movements/${productUuid}`, {
    method: "POST",
    body: JSON.stringify(input),
  });
