import { useState } from "react";
import type { MovementType, Product, ProductFilters as Filters } from "../types/types";
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useRegisterMovement,
  useUpdateProduct,
} from "../hooks/useProducts";
import { ProductFilters } from "./ProductFilters";

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
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre (5-30 caracteres)"
          required
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
          type="number"
          min={1}
          className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={createProduct.isPending}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Agregar
        </button>
      </div>
      {createProduct.error && (
        <p className="mt-1 text-sm text-red-600">
          {createProduct.error.message}
        </p>
      )}
    </form>
  );
};

const StockAdjuster = ({ productUuid }: { productUuid: string }) => {
  const [quantity, setQuantity] = useState("1");
  const movement = useRegisterMovement();

  const submit = (typeMovement: MovementType) => {
    const value = Number(quantity);
    if (!Number.isInteger(value) || value < 1) return;
    movement.mutate({ productUuid, input: { quantity: value, typeMovement } });
  };

  return (
    <div className="mt-2 flex items-center gap-2">
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        min={1}
        className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
      />
      <button
        onClick={() => submit("IN")}
        disabled={movement.isPending}
        className="rounded-md border border-green-300 px-2 py-1 text-sm font-medium text-green-700 hover:bg-green-50 disabled:opacity-50"
      >
        Entrada
      </button>
      <button
        onClick={() => submit("OUT")}
        disabled={movement.isPending}
        className="rounded-md border border-red-300 px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
      >
        Salida
      </button>
      {movement.error && (
        <span className="text-sm text-red-600">{movement.error.message}</span>
      )}
    </div>
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

  const rowError = updateProduct.error ?? deleteProduct.error;

  return (
    <li className="px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        {editing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
        ) : (
          <span className="flex-1 font-medium text-gray-800">
            {product.name}
          </span>
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
      </div>

      <StockAdjuster productUuid={product.uuid} />

      {rowError && (
        <p className="mt-1 text-sm text-red-600">{rowError.message}</p>
      )}
    </li>
  );
};

export const Products = () => {
  const [filters, setFilters] = useState<Filters>({});
  const { data: products, isLoading, error } = useProducts(filters);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Productos</h1>
      <CreateProductForm />
      <ProductFilters onChange={setFilters} />

      {isLoading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}

      {products && (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
          {products.map((product) => (
            <ProductRow key={product.uuid} product={product} />
          ))}
        </ul>
      )}
    </>
  );
};
