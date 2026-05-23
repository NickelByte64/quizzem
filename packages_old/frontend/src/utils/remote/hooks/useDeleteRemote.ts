import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { UUID } from "crypto";
import { http, UseMutationRemoteOptions } from "~/utils";

export function useDeleteRemote(
  target: string,
  options?: UseMutationRemoteOptions
): UseMutationResult<void, unknown, UUID> {
  const { params } = options ?? {};

  return useMutation<void, unknown, UUID>({
    mutationKey: [target, params],
    mutationFn: async (id): Promise<void> => {
      return http
        .delete<void>(`${target}/${id}`, { params })
        .then((res) => res.data);
    },
  });
}
