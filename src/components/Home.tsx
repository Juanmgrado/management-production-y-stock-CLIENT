import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/auth";
import { authMeKey } from "../api/keys";

export const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // el server ya no tenía sesión: igual limpiamos del lado del cliente
    }
    queryClient.setQueryData(authMeKey, null);
    navigate("/");
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </>
  );
};
