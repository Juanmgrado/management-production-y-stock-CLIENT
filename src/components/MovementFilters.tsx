import { useState } from "react";
import type { MovementFilters as Filters, MovementType } from "../types/types";
import { useProducts } from "../hooks/useProducts";

const fieldClass = "rounded-md border border-gray-300 px-3 py-2 text-sm";

export const MovementFilters = ({
  onChange,
}: {
  onChange: (filters: Filters) => void;
}) => {
  const { data: products } = useProducts({ status: "all", limit: 100 });
  const [productUuid, setProductUuid] = useState("");
  const [type, setType] = useState<MovementType | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange({
      productUuid: productUuid || undefined,
      movementType: type || undefined,
      startDate: startDate || undefined,
      endDate: endDate ? `${endDate}T23:59:59` : undefined,
    });
  };

  const clear = () => {
    setProductUuid("");
    setType("");
    setStartDate("");
    setEndDate("");
    onChange({});
  };

  return (
    <form onSubmit={apply} className="mb-4 flex flex-wrap items-end gap-2">
      <select
        value={productUuid}
        onChange={(e) => setProductUuid(e.target.value)}
        className={`${fieldClass} flex-1`}
      >
        <option value="">Todos los productos</option>
        {products?.data.map((product) => (
          <option key={product.uuid} value={product.uuid}>
            {product.name}
          </option>
        ))}
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as MovementType | "")}
        className={fieldClass}
      >
        <option value="">Entradas y salidas</option>
        <option value="IN">Entradas</option>
        <option value="OUT">Salidas</option>
      </select>
      <label className="flex flex-col text-xs text-gray-500">
        Desde
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col text-xs text-gray-500">
        Hasta
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={fieldClass}
        />
      </label>
      <button
        type="submit"
        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
      >
        Filtrar
      </button>
      <button
        type="button"
        onClick={clear}
        className="px-3 py-2 text-sm text-gray-500 hover:text-gray-900"
      >
        Limpiar
      </button>
    </form>
  );
};
