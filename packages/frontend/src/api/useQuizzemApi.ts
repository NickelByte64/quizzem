import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  HTTP,
  type ExtendedRequestInit,
  type HttpResponse,
} from "~/src/api/http";

export function useGetQuizzemData<Res>(
  target: string,
  requestInit?: ExtendedRequestInit<void>,
): UseQueryResult<HttpResponse<Res>> {
  return useQuery<HttpResponse<Res>>({
    queryKey: [target],
    queryFn: async () => await HTTP.get(target, requestInit),
  });
}

export function usePostQuizzemData<Req, Res>(
  target: string,
): UseMutationResult<HttpResponse<Res>, Error, Req> {
  return useMutation<HttpResponse<Res>, Error, Req>({
    mutationKey: [target],
    mutationFn: async (body) => await HTTP.post(target, { body }),
  });
}
