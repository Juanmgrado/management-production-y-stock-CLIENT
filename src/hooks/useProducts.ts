import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { productsKey } from "../api/keys";

export const useProducts = () =>
  useQuery({
    queryKey: productsKey,
    queryFn: getProducts,
  });
