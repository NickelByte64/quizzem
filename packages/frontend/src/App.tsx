import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type JSX } from "react";
import { RouterProvider } from "react-router";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { ROUTER } from "~/src/router/router";
import { THEME } from "~/src/styling/theme";

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider theme={THEME}>
        <RouterProvider router={ROUTER} />
        <CssBaseline />
      </ThemeProvider>

      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
    </QueryClientProvider>
  );
}
