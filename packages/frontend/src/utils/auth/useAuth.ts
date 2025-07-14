import { QueryClient, UseQueryResult } from "@tanstack/react-query";
import { calculateStaleTimeInMinutes, useGetRemote } from "~/utils";

export function useAuth(): UseQueryResult<boolean> {
  return useGetRemote<boolean>("/auth/authenticated", {
    staleTime: calculateStaleTimeInMinutes(5),
  });
}

export function invalidateAuth(queryClient: QueryClient): void {
  queryClient.invalidateQueries({
    queryKey: ["/auth/authenticated"],
  });
}
