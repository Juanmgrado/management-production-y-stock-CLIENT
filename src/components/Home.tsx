import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    queryClient.setQueryData(["auth", "me"], null);
    navigate("/");
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </>
  );
};
