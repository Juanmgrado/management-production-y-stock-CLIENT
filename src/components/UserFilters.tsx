import { useState } from "react";
import type {
  ProductStatus,
  SortOrder,
  UserFilters as Filters,
  UserRole,
  UserSortBy,
} from "../types/types";

const fieldClass = "rounded-md border border-gray-300 px-3 py-2 text-sm";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Sin orden" },
  { value: "name-ASC", label: "Nombre (A-Z)" },
  { value: "name-DESC", label: "Nombre (Z-A)" },
  { value: "email-ASC", label: "Email (A-Z)" },
  { value: "email-DESC", label: "Email (Z-A)" },
];

export const UserFilters = ({
  onChange,
}: {
  onChange: (filters: Filters) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("all");
  const [status, setStatus] = useState<ProductStatus>("active");
  const [sort, setSort] = useState("");

  const apply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [sortBy, order] = sort ? sort.split("-") : [];
    onChange({
      name: name || undefined,
      email: email || undefined,
      role,
      status,
      sortBy: (sortBy as UserSortBy) || undefined,
      order: (order as SortOrder) || undefined,
    });
  };

  const clear = () => {
    setName("");
    setEmail("");
    setRole("all");
    setStatus("active");
    setSort("");
    onChange({ role: "all", status: "active" });
  };

  return (
    <form onSubmit={apply} className="mb-4 flex flex-wrap items-end gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className={`${fieldClass} flex-1`}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={`${fieldClass} flex-1`}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className={fieldClass}
      >
        <option value="all">Todos los roles</option>
        <option value="admin">Administradores</option>
        <option value="user">Usuarios</option>
      </select>
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
