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