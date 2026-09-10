import { useState } from "react";
import type { Product } from "../types/types";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "../hooks/useProducts";

const CreateProductForm = () => {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const createProduct = useCreateProduct();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProduct.mutate(
      { name, stock: stock === "" ? undefined : Number(stock) },
      {
        onSuccess: () => {
          setName("");
          setStock("");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        required
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
      <input
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock"
        type="number"
        min={0}
        className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={createProduct.isPending}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Agregar
      </button>
    </form>
  );
};

const ProductRow = ({ product }: { product: Product }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleSave = () => {
    updateProduct.mutate(
      { uuid: product.uuid, input: { name } },
      { onSuccess: () => setEditing(false) },
    );
  };

  return (
    <li className="flex items-center justify-between gap-3 px-4 py-3">
      {editing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm"
        />
      ) : (
        <span className="flex-1 font-medium text-gray-800">{product.name}</span>
      )}

      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold ${
          product.stock > 0
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        stock: {product.stock}
      </span>

      {editing ? (
        <>
          <button
            onClick={handleSave}
            disabled={updateProduct.isPending}
            className="text-sm font-medium text-gray-900 disabled:opacity-50"
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setName(product.name);
              setEditing(false);
            }}
            className="text-sm text-gray-500"
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Editar
          </button>
          <button
            onClick={() => deleteProduct.mutate(product.uuid)}
            disabled={deleteProduct.isPending}
            className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            Eliminar
          </button>
        </>
      )}
    </li>
  );
};

export const Products = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading)
    return <p className="text-center text-gray-500">Cargando...</p>;
  if (error)
    return <p className="text-center text-red-600">{error.message}</p>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Productos</h1>
      <CreateProductForm />
      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
        {products?.map((product) => (
          <ProductRow key={product.uuid} product={product} />
        ))}
      </ul>
    </>
  );
};
