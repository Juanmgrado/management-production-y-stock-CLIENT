import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../api/auth";
import { authMeKey } from "../api/keys";
import type { ChangePasswordInput } from "../types/types";

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: ChangePasswordInput) => changePassword(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authMeKey }),
  });
};
