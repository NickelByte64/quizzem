import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Router } from "~/router/router";
import { queryClient, useTheme } from "~/utils";

export function App() {
  const { setThemeInitial } = useTheme();

  useEffect(() => setThemeInitial(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
