import { UseQueryResult } from "@tanstack/react-query";
import {
  calculateStaleTimeInMinutes,
  queryClient,
  useGetRemote,
} from "~/utils";

export function useAuth(): UseQueryResult<boolean> {
  return useGetRemote<boolean>("/auth/authenticated", {
    staleTime: calculateStaleTimeInMinutes(5),
  });
}

export function invalidateAuth(): void {
  queryClient.invalidateQueries({
    queryKey: ["/auth/authenticated"],
  });
}
