import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { http, UseMutationRemoteOptions } from "~/utils";

export function usePostRemote<Req, Res>(
  target: string,
  options?: UseMutationRemoteOptions
): UseMutationResult<Res, AxiosError, Req> {
  const { params } = options ?? {};

  return useMutation<Res, AxiosError, Req>({
    mutationKey: [target, params],
    mutationFn: async (body): Promise<Res> => {
      return http.post<Res>(target, body, { params }).then((res) => res.data);
    },
  });
}
