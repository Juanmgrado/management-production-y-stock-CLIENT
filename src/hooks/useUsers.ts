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
import { useToast } from "../context/useToast";
import type { CreateUserInput, UpdateUserInput, UserFilters } from "../types/types";

export const useUsers = (filters: UserFilters = {}, enabled = true) =>
  useQuery({
    queryKey: usersListKey(filters),
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
    enabled,
  });

const useUserMutationCallbacks = (message: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKey });
      // an admin can edit their own row, so keep the session in sync too
      queryClient.invalidateQueries({ queryKey: authMeKey });
      addToast(message);
    },
  };
};

export const useCreateUser = () =>
  useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    ...useUserMutationCallbacks("Usuario creado"),
  });

export const useUpdateUser = () =>
  useMutation({
    mutationFn: (vars: { uuid: string; input: UpdateUserInput }) =>
      updateUser(vars.uuid, vars.input),
    ...useUserMutationCallbacks("Usuario actualizado"),
  });

export const useDeleteUser = () =>
  useMutation({
    mutationFn: (uuid: string) => deleteUser(uuid),
    ...useUserMutationCallbacks("Usuario desactivado"),
  });

export const useReactivateUser = () =>
  useMutation({
    mutationFn: (uuid: string) => reactivateUser(uuid),
    ...useUserMutationCallbacks("Usuario reactivado"),
  });
