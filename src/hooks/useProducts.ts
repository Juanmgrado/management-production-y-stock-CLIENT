import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api/products";
import { productsKey, productsListKey } from "../api/keys";
import { useToast } from "../context/useToast";
import type {
  CreateProductInput,
  ProductFilters,
  UpdateProductInput,
} from "../types/types";

export const useProducts = (filters: ProductFilters = {}) =>
  useQuery({
    queryKey: productsListKey(filters),
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
  });

const useProductMutationCallbacks = (message: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKey });
      addToast(message);
    },
  };
};

export const useCreateProduct = () =>
  useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    ...useProductMutationCallbacks("Producto creado"),
  });

export const useUpdateProduct = () =>
  useMutation({
    mutationFn: (vars: { uuid: string; input: UpdateProductInput }) =>
      updateProduct(vars.uuid, vars.input),
    ...useProductMutationCallbacks("Producto actualizado"),
  });

export const useDeleteProduct = () =>
  useMutation({
    mutationFn: (uuid: string) => deleteProduct(uuid),
    ...useProductMutationCallbacks("Producto desactivado"),
  });
