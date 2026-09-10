import { useState } from "react";
import type { User, UserFilters as Filters } from "../types/types";
import {
  useCreateUser,
  useDeleteUser,
  useReactivateUser,
  useUpdateUser,
  useUsers,
} from "../hooks/useUsers";
import { useAuth } from "../context/useAuth";
import { UserFilters } from "./UserFilters";

const inputClass = "rounded-md border border-gray-300 px-3 py-2 text-sm";

const CreateUserForm = () => {
  const empty = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    isAdmin: false,
  };
  const [form, setForm] = useState(empty);
  const createUser = useCreateUser();

  const set = <K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser.mutate(form, { onSuccess: () => setForm(empty) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded-lg border border-gray-200 bg-white p-4"
    >
      <div className="flex flex-wrap gap-2">
        <input
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Nombre (3-30)"
          required
          className={`${inputClass} flex-1`}
        />
        <input
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="Email"
          type="email"
          required
          className={`${inputClass} flex-1`}
        />
        <input
          value={form.password}
          onChange={(e) => set("password", e.target.value)}
          placeholder="Contraseña (mín. 6)"
          type="password"
          required
          className={inputClass}
        />
        <input
          value={form.repeatPassword}
          onChange={(e) => set("repeatPassword", e.target.value)}
          placeholder="Repetir contraseña"
          type="password"
          required
          className={inputClass}
        />
        <label className="flex items-center gap-1.5 px-1 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.isAdmin}
            onChange={(e) => set("isAdmin", e.target.checked)}
          />
          Administrador
        </label>
        <button
          type="submit"
          disabled={createUser.isPending}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Crear
        </button>
      </div>
      {createUser.error && (
        <p className="mt-2 text-sm text-red-600">{createUser.error.message}</p>
      )}
    </form>
  );
};

const RoleBadge = ({ isAdmin }: { isAdmin: boolean }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      isAdmin ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
    }`}
  >
    {isAdmin ? "Admin" : "Usuario"}
  </span>
);

const UserRow = ({ user, isSelf }: { user: User; isSelf: boolean }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const reactivateUser = useReactivateUser();

  const cancel = () => {
    setDraft({ name: user.name, email: user.email, isAdmin: user.isAdmin });
    setEditing(false);
  };

  const save = () => {
    updateUser.mutate(
      { uuid: user.uuid, input: draft },
      { onSuccess: () => setEditing(false) },
    );
  };

  const rowError =
    updateUser.error ?? deleteUser.error ?? reactivateUser.error;

  return (
    <li className={`px-4 py-3 ${user.isActive ? "" : "bg-gray-100"}`}>
      <div className="flex flex-wrap items-center gap-3">
        {editing ? (
          <>
            <input
              value={draft.name}
              onChange={(e) =>
                setDraft((d) => ({ ...d, name: e.target.value }))
              }
              className={`${inputClass} flex-1`}
            />
            <input
              value={draft.email}
              onChange={(e) =>
                setDraft((d) => ({ ...d, email: e.target.value }))
              }
              type="email"
              className={`${inputClass} flex-1`}
            />
            <label className="flex items-center gap-1.5 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={draft.isAdmin}
                disabled={isSelf}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, isAdmin: e.target.checked }))
                }
              />
              Admin
            </label>
          </>
        ) : (
          <>
            <span
              className={`flex-1 font-medium ${
                user.isActive
                  ? "text-gray-800"
                  : "text-gray-400 line-through"
              }`}
            >
              {user.name}
            </span>
            <span className="flex-1 text-sm text-gray-500">{user.email}</span>
            <RoleBadge isAdmin={user.isAdmin} />
            {isSelf && (
              <span className="text-xs font-medium text-gray-400">(vos)</span>
            )}
            {!user.isActive && (
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-500">
                Inactivo
              </span>
            )}
          </>
        )}

        {editing ? (
          <>
            <button
              onClick={save}
              disabled={updateUser.isPending}
              className="text-sm font-medium text-gray-900 disabled:opacity-50"
            >
              Guardar
            </button>
            <button onClick={cancel} className="text-sm text-gray-500">
              Cancelar
            </button>
          </>
        ) : user.isActive ? (
          <>
            <button
              onClick={() => setEditing(true)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Editar
            </button>
            {!isSelf && (
              <button
                onClick={() => deleteUser.mutate(user.uuid)}
                disabled={deleteUser.isPending}
                className="text-sm font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
              >
                Desactivar
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => reactivateUser.mutate(user.uuid)}
            disabled={reactivateUser.isPending}
            className="text-sm font-medium text-green-700 hover:text-green-900 disabled:opacity-50"
          >
            Reactivar
          </button>
        )}
      </div>

      {rowError && (
        <p className="mt-1 text-sm text-red-600">{rowError.message}</p>
      )}
    </li>
  );
};

const initialFilters: Filters = {
  role: "all",
  status: "active",
  page: 1,
  limit: 10,
};

export const Users = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const { data: page, isLoading, error } = useUsers(filters);

  const handleFilterChange = (next: Filters) => {
    setFilters({ ...initialFilters, ...next, page: 1 });
  };

  const goToPage = (target: number) => {
    setFilters((prev) => ({ ...prev, page: target }));
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Usuarios</h1>
      <CreateUserForm />
      <UserFilters onChange={handleFilterChange} />

      {isLoading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error.message}</p>}

      {page && (
        <>
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {page.data.map((row) => (
              <UserRow
                key={row.uuid}
                user={row}
                isSelf={row.uuid === user?.uuid}
              />
            ))}
          </ul>

          {page.data.length === 0 && (
            <p className="mt-4 text-center text-gray-500">Sin resultados</p>
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
