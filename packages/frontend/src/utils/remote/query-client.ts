import { QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
});

/**
 * Calculates the stale time in seconds.
 * @default
 * 1 second.
 */
export function calculateStaleTimeInSeconds(seconds: number = 1): number {
  return 1000 * seconds;
}

/**
 * Calculates the stale time in minutes.
 * @default
 * 1 minute.
 */
export function calculateStaleTimeInMinutes(minutes: number = 1): number {
  return calculateStaleTimeInSeconds(60) * minutes;
}
