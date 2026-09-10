import { useState } from "react";
import type { MovementFilters as Filters } from "../types/types";
import { useMovements } from "../hooks/useMovements";
import { MovementFilters } from "./MovementFilters";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  dateStyle: "short",
  timeStyle: "short",
});

const initialFilters: Filters = { page: 1, limit: 10 };

export const Movements = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const { data: page, isLoading, error } = useMovements(filters);

  const handleFilterChange = (next: Filters) => {
    setFilters({ ...initialFilters, ...next, page: 1 });
  };

  const goToPage = (target: number) => {
    setFilters((prev) => ({ ...prev, page: target }));
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">
        Movimientos de stock
      </h1>
      <MovementFilters onChange={handleFilterChange} />

      {isLoading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}

      {page && (
        <>
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {page.data.map((movement) => (
              <li
                key={movement.uuid}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 text-sm"
              >
                <span className="w-32 shrink-0 text-gray-500">
                  {dateFormatter.format(new Date(movement.createdAt))}
                </span>
                <span className="flex-1 font-medium text-gray-800">
                  {movement.product.name}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    movement.typeMovement === "IN"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {movement.typeMovement === "IN" ? "Entrada" : "Salida"}
                </span>
                <span className="w-16 text-right font-semibold text-gray-700">
                  {movement.typeMovement === "IN" ? "+" : "-"}
                  {movement.quantity}
                </span>
                <span className="w-32 shrink-0 text-gray-500">
                  {movement.user?.name ?? "—"}
                </span>
                {movement.note && movement.note !== "No note" && (
                  <span className="w-full text-gray-400">{movement.note}</span>
                )}
              </li>
            ))}
          </ul>

          {page.data.length === 0 && (
            <p className="mt-4 text-center text-gray-500">
              Sin movimientos registrados
            </p>
          )}

          {page.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-3 text-sm">
              <button
                onClick={() => goToPage(page.page - 1)}
                disabled={page.page <= 1}
                className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-gray-500">
                Página {page.page} de {page.totalPages}
              </span>
              <button
                onClick={() => goToPage(page.page + 1)}
                disabled={page.page >= page.totalPages}
                className="rounded-md border border-gray-300 px-3 py-1.5 font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};
