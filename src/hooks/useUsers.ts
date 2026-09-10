import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUsers,
  reactivateUser,
  updateUser,
} from "../api/users";
import { authMeKey, usersKey, usersListKey } from "../api/keys";
import type { CreateUserInput, UpdateUserInput, UserFilters } from "../types/types";

export const useUsers = (filters: UserFilters = {}, enabled = true) =>
  useQuery({
    queryKey: usersListKey(filters),
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
    enabled,
  });

const useInvalidateUsers = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: usersKey });
    // an admin can edit their own row, so keep the session in sync too
    queryClient.invalidateQueries({ queryKey: authMeKey });
  };
};

export const useCreateUser = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: invalidate,
  });
};

export const useUpdateUser = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (vars: { uuid: string; input: UpdateUserInput }) =>
      updateUser(vars.uuid, vars.input),
    onSuccess: invalidate,
  });
};

export const useDeleteUser = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (uuid: string) => deleteUser(uuid),
    onSuccess: invalidate,
  });
};

export const useReactivateUser = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (uuid: string) => reactivateUser(uuid),
    onSuccess: invalidate,
  });
};
