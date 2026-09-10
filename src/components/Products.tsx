import { useProducts } from "../hooks/useProducts";

export const Products = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading)
    return <p className="text-center text-gray-500">Cargando...</p>;
  if (error)
    return <p className="text-center text-red-600">{error.message}</p>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Productos</h1>
      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {products?.map((product) => (
          <li
            key={product.uuid}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="font-medium text-gray-800">{product.name}</span>
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              stock: {product.stock}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
