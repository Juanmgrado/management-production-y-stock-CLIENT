export type Product = {
  uuid: string;
  name: string;
  stock: number;
  isActive: boolean;
};

export type User = {
  uuid: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isActive: boolean;
};

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};