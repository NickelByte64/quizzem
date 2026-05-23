import { UseQueryOptions } from "@tanstack/react-query";

export type UseQueryRemoteOptions<Res> = Pick<
  UseQueryOptions<Res>,
  "enabled" | "staleTime"
> & {
  params?: Record<string, unknown>;
};

export type UseMutationRemoteOptions = {
  params?: Record<string, unknown>;
};
