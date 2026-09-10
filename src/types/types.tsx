export type Product = {
  uuid: string;
  name: string;
  stock: number;
  isActive: boolean;
};

export type CreateProductInput = {
  name: string;
  stock?: number;
};

export type UpdateProductInput = {
  name: string;
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