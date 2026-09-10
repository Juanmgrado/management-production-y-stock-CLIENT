import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMovements, registerMovement } from "../api/movements";
import { movementsKey, movementsListKey, productsKey } from "../api/keys";
import { useToast } from "../context/useToast";
import type { MovementFilters, RegisterMovementInput } from "../types/types";

export const useMovements = (filters: MovementFilters = {}) =>
  useQuery({
    queryKey: movementsListKey(filters),
    queryFn: () => getMovements(filters),
    placeholderData: keepPreviousData,
  });

export const useRegisterMovement = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (vars: { productUuid: string; input: RegisterMovementInput }) =>
      registerMovement(vars.productUuid, vars.input),
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: productsKey });
      queryClient.invalidateQueries({ queryKey: movementsKey });
      addToast(
        vars.input.typeMovement === "IN"
          ? "Entrada registrada"
          : "Salida registrada",
      );
    },
  });
};
