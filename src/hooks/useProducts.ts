import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api/products";
import { productsKey } from "../api/keys";
import type { CreateProductInput, UpdateProductInput } from "../types/types";

export const useProducts = () =>
  useQuery({
    queryKey: productsKey,
    queryFn: getProducts,
  });

const useInvalidateProducts = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: productsKey });
};

export const useCreateProduct = () => {
  const invalidate = useInvalidateProducts();
  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: invalidate,
  });
};

export const useUpdateProduct = () => {
  const invalidate = useInvalidateProducts();
  return useMutation({
    mutationFn: (vars: { uuid: string; input: UpdateProductInput }) =>
      updateProduct(vars.uuid, vars.input),
    onSuccess: invalidate,
  });
};

export const useDeleteProduct = () => {
  const invalidate = useInvalidateProducts();
  return useMutation({
    mutationFn: (uuid: string) => deleteProduct(uuid),
    onSuccess: invalidate,
  });
};
