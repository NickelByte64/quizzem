import { QueryClientProvider } from "@tanstack/react-query";
import { type JSX } from "react";
import { RouterProvider } from "react-router";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { ROUTER } from "~/src/router/router";

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <RouterProvider router={ROUTER} />
    </QueryClientProvider>
  );
}
