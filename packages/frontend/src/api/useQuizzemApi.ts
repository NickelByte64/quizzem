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

export type UseQuizzemQuery<Res> = UseQueryResult<HttpResponse<Res>, Error>;

export type UseQuizzemMutation<Req, Res> = UseMutationResult<
  HttpResponse<Res>,
  Error,
  Req
>;

export function useGetQuizzemData<Res>(
  target: string,
  requestInit?: ExtendedRequestInit<void>,
): UseQuizzemQuery<Res> {
  return useQuery<HttpResponse<Res>>({
    queryKey: [target],
    queryFn: async () => await HTTP.get(target, requestInit),
  });
}

export function usePostQuizzemData<Req, Res>(
  target: string,
): UseQuizzemMutation<Req, Res> {
  return useMutation<HttpResponse<Res>, Error, Req>({
    mutationKey: [target],
    mutationFn: async (body) => await HTTP.post(target, { body }),
  });
}

export function usePutQuizzemData<Req, Res>(
  target: string,
): UseQuizzemMutation<Req, Res> {
  return useMutation<HttpResponse<Res>, Error, Req>({
    mutationKey: [target],
    mutationFn: async (body) => await HTTP.put(target, { body }),
  });
}
