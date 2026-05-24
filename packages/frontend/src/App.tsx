import { type JSX } from "react";
import { RouterProvider } from "react-router";
import { ROUTER } from "~/src/router/router";

export function App(): JSX.Element {
  return <RouterProvider router={ROUTER} />;
}
