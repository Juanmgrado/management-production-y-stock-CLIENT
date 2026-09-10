import { useState } from "react";
import type { ProductFilters as Filters } from "../types/types";

const toNumber = (value: string) => (value === "" ? undefined : Number(value));

const inputClass =
  "w-28 rounded-md border border-gray-300 px-3 py-2 text-sm";

export const ProductFilters = ({
  onChange,
}: {
  onChange: (filters: Filters) => void;
}) => {
  const [name, setName] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChange({
      name: name || undefined,
      minStock: toNumber(minStock),
      maxStock: toNumber(maxStock),
    });
  };

  const clear = () => {
    setName("");
    setMinStock("");
    setMaxStock("");
    onChange({});
  };

  return (
    <form onSubmit={apply} className="mb-4 flex flex-wrap items-end gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className={`${inputClass} flex-1`}
      />
      <input
        value={minStock}
        onChange={(e) => setMinStock(e.target.value)}
        placeholder="Stock mín."
        type="number"
        min={0}
        className={inputClass}
      />
      <input
        value={maxStock}
        onChange={(e) => setMaxStock(e.target.value)}
        placeholder="Stock máx."
        type="number"
        min={0}
        className={inputClass}
      />
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
