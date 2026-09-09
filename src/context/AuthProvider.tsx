import { useQuery } from "@tanstack/react-query";
import type { AuthContextValue, User } from "../types/types";
import { AuthContext } from "./AuthContext";

const fetchMe = async (): Promise<User | null> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    credentials: "include"
  })
  if(response.status === 401){ return null}

  if(!response.ok){
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  const data = await response.json()
  return data.data
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 
  const { data, isPending } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    retry: false
  })

  const authUser: AuthContextValue = {
    user: data ?? null,
    isAuthenticated: !!data,
    isLoading: isPending
  }
  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};
