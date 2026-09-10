import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMovements, registerMovement } from "../api/movements";
import { movementsKey, movementsListKey, productsKey } from "../api/keys";
import type { MovementFilters, RegisterMovementInput } from "../types/types";

export const useMovements = (filters: MovementFilters = {}) =>
  useQuery({
    queryKey: movementsListKey(filters),
    queryFn: () => getMovements(filters),
    placeholderData: keepPreviousData,
  });

export const useRegisterMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vars: { productUuid: string; input: RegisterMovementInput }) =>
      registerMovement(vars.productUuid, vars.input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKey });
      queryClient.invalidateQueries({ queryKey: movementsKey });
    },
  });
};
