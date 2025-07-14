import { JSX } from "react";
import { BrowserRouter } from "react-router";
import { AUTH_ROUTES } from "~/pages/auth/auth.routes";
import { QUESTION_ROUTES } from "~/pages/questions/question.routes";
import { LayoutRoutes } from "~/router/routes.service";

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <LayoutRoutes routes={AUTH_ROUTES} />
      <LayoutRoutes routes={QUESTION_ROUTES} />
    </BrowserRouter>
  );
}
