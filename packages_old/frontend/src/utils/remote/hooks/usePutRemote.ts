import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { http, UseMutationRemoteOptions } from "~/utils";

export function usePutRemote<Req, Res>(
  target: string,
  options?: UseMutationRemoteOptions
): UseMutationResult<Res, unknown, Req> {
  const { params } = options ?? {};

  return useMutation<Res, unknown, Req>({
    mutationKey: [target, params],
    mutationFn: async (body): Promise<Res> => {
      return http.put<Res>(target, body, { params }).then((res) => res.data);
    },
  });
}
