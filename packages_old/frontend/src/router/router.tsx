import { JSX } from "react";
import { BrowserRouter, RouteObject } from "react-router";
import { BasePage } from "~/components/global/base-page";
import { AUTH_ROUTES } from "~/pages/auth/auth.routes";
import { QUESTION_ROUTES } from "~/pages/questions/question.routes";
import { LayoutRoutes } from "~/router/routes.service";

const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <BasePage />,
    children: [...AUTH_ROUTES, ...QUESTION_ROUTES],
  },
];

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <LayoutRoutes routes={ROUTES} />
    </BrowserRouter>
  );
}
