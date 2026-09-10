import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { login } from "../api/auth";
import { authMeKey } from "../api/keys";

export const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError(null);
      setSubmitting(true);
      await login(formData);
      await queryClient.invalidateQueries({ queryKey: authMeKey });
      navigate("/products");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
      setSubmitting(false);
    }
  };

  if (isLoading) return null;

  if (isAuthenticated) return <Navigate to="/products" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Iniciar sesión</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gestión de producción y stock
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
              required
              autoComplete="email"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
          <button
            type="button"
            onClick={() => setFormData({ email: "", password: "" })}
            className="text-sm text-gray-500 hover:text-gray-900"
          >
            Limpiar
          </button>
        </form>
      </div>
    </div>
  );
};
