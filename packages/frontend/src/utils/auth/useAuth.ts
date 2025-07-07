import { UseQueryResult } from "@tanstack/react-query";
import { calculateStaleTimeInMinutes, useGetRemote } from "~/utils";

export function useAuth(): UseQueryResult<boolean> {
  return useGetRemote<boolean>("/auth/authenticated", {
    staleTime: calculateStaleTimeInMinutes(),
  });
}
