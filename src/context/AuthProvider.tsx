import { useQuery } from "@tanstack/react-query";
import type { AuthContextValue } from "../types/types";
import { AuthContext } from "./AuthContext";
import { getMe } from "../api/auth";
import { authMeKey } from "../api/keys";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending } = useQuery({
    queryKey: authMeKey,
    queryFn: getMe,
    retry: false,
  });

  const authUser: AuthContextValue = {
    user: data ?? null,
    isAuthenticated: !!data,
    isLoading: isPending,
  };

  return (
    <AuthContext.Provider value={authUser}>{children}</AuthContext.Provider>
  );
};
