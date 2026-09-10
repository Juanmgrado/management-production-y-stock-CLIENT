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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError(null);
      await login(formData);
      await queryClient.invalidateQueries({ queryKey: authMeKey });
      navigate("/products");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  if (isLoading) return null;

  if (isAuthenticated) return <Navigate to="/products" replace />;

  return (
    <>
      <h1>Login User</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          name="email"
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          onChange={handleChange}
          value={formData.password}
          type="password"
          name="password"
          required
        ></input>
        <button type="submit">Send</button>
        <button
          type="button"
          onClick={() => setFormData({ email: "", password: "" })}
        >
          Erase
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};
