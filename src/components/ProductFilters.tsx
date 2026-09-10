import { useState } from "react";
import type {
  ProductFilters as Filters,
  ProductSortBy,
  ProductStatus,
  SortOrder,
} from "../types/types";

const toNumber = (value: string) => (value === "" ? undefined : Number(value));

const fieldClass = "rounded-md border border-gray-300 px-3 py-2 text-sm";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Sin orden" },
  { value: "name-ASC", label: "Nombre (A-Z)" },
  { value: "name-DESC", label: "Nombre (Z-A)" },
  { value: "stock-ASC", label: "Stock (menor a mayor)" },
  { value: "stock-DESC", label: "Stock (mayor a menor)" },
];

export const ProductFilters = ({
  onChange,
}: {
  onChange: (filters: Filters) => void;
}) => {
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");
  const [status, setStatus] = useState<ProductStatus>("active");
  const [sort, setSort] = useState("");

  const buildFilters = (): Filters => {
    const [sortBy, order] = sort ? sort.split("-") : [];
    return {
      minStock: toNumber(minStock),
      maxStock: toNumber(maxStock),
      status,
      sortBy: (sortBy as ProductSortBy) || undefined,
      order: (order as SortOrder) || undefined,
    };
  };

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange(buildFilters());
  };

  const clear = () => {
    setMinStock("");
    setMaxStock("");
    setStatus("active");
    setSort("");
    onChange({ status: "active" });
  };

  return (
    <form onSubmit={apply} className="mb-4 flex flex-wrap items-end gap-2">
      <input
        value={minStock}
        onChange={(e) => setMinStock(e.target.value)}
        placeholder="Stock mín."
        type="number"
        min={0}
        className={`${fieldClass} w-28`}
      />
      <input
        value={maxStock}
        onChange={(e) => setMaxStock(e.target.value)}
        placeholder="Stock máx."
        type="number"
        min={0}
        className={`${fieldClass} w-28`}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as ProductStatus)}
        className={fieldClass}
      >
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
        <option value="all">Todos</option>
      </select>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className={fieldClass}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
