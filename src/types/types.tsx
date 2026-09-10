export type Product = {
  uuid: string;
  name: string;
  stock: number;
  isActive: boolean;
  createdBy?: {
    uuid: string;
    name: string;
  };
};

export type CreateProductInput = {
  name: string;
  stock?: number;
};

export type UpdateProductInput = {
  name: string;
};

export type ProductStatus = "active" | "inactive" | "all";
export type ProductSortBy = "name" | "stock";
export type SortOrder = "ASC" | "DESC";

export type ProductFilters = {
  name?: string;
  minStock?: number;
  maxStock?: number;
  status?: ProductStatus;
  sortBy?: ProductSortBy;
  order?: SortOrder;
  createdBy?: string;
  page?: number;
  limit?: number;
};

export type MovementType = "IN" | "OUT";

export type RegisterMovementInput = {
  quantity: number;
  typeMovement: MovementType;
  note?: string;
};

export type Movement = {
  uuid: string;
  quantity: number;
  note: string;
  typeMovement: MovementType;
  productUuid: string;
  createdAt: string;
};

export type MovementListItem = {
  uuid: string;
  quantity: number;
  typeMovement: MovementType;
  note: string;
  createdAt: string;
  product: { uuid: string; name: string };
  user: { name: string } | null;
};

export type MovementFilters = {
  productUuid?: string;
  movementType?: MovementType;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
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

export type UserRole = "admin" | "user" | "all";
export type UserSortBy = "name" | "email";

export type UserFilters = {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: ProductStatus;
  sortBy?: UserSortBy;
  order?: SortOrder;
  page?: number;
  limit?: number;
};

export type CreateUserInput = {
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  repeatPassword: string;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
  isAdmin?: boolean;
};