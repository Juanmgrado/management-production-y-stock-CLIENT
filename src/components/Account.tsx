import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useChangePassword } from "../hooks/useChangePassword";

const inputClass =
  "rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900";

export const Account = () => {
  const { user } = useAuth();
  const changePassword = useChangePassword();
  const empty = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  };
  const [form, setForm] = useState(empty);
  const [done, setDone] = useState(false);

  const set = (key: keyof typeof empty, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDone(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    changePassword.mutate(form, {
      onSuccess: () => {
        setForm(empty);
        setDone(true);
      },
    });
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-4 text-2xl font-bold text-gray-900">Mi cuenta</h1>

      <dl className="mb-8 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white text-sm">
        <div className="flex justify-between px-4 py-3">
          <dt className="text-gray-500">Nombre</dt>
          <dd className="font-medium text-gray-800">{user?.name}</dd>
        </div>
        <div className="flex justify-between px-4 py-3">
          <dt className="text-gray-500">Email</dt>
          <dd className="font-medium text-gray-800">{user?.email}</dd>
        </div>
        <div className="flex justify-between px-4 py-3">
          <dt className="text-gray-500">Rol</dt>
          <dd className="font-medium text-gray-800">
            {user?.isAdmin ? "Administrador" : "Usuario"}
          </dd>
        </div>
      </dl>

      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        Cambiar contraseña
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4"
      >
        <input
          type="password"
          placeholder="Contraseña actual"
          value={form.currentPassword}
          onChange={(e) => set("currentPassword", e.target.value)}
          required
          autoComplete="current-password"
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Nueva contraseña (mín. 6)"
          value={form.newPassword}
          onChange={(e) => set("newPassword", e.target.value)}
          required
          autoComplete="new-password"
          className={inputClass}
        />
        <input
          type="password"
          placeholder="Repetir nueva contraseña"
          value={form.repeatNewPassword}
          onChange={(e) => set("repeatNewPassword", e.target.value)}
          required
          autoComplete="new-password"
          className={inputClass}
        />

        {changePassword.error && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {changePassword.error.message}
          </p>
        )}
        {done && (
          <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
            Contraseña actualizada.
          </p>
        )}

        <button
          type="submit"
          disabled={changePassword.isPending}
          className="mt-1 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {changePassword.isPending ? "Guardando..." : "Actualizar contraseña"}
        </button>
      </form>
    </div>
  );
};
