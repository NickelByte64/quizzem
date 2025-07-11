import { JSX } from "react";
import { BrowserRouter } from "react-router";
import { AUTH_ROUTES } from "~/pages/auth/auth.routes";
import { LayoutRoutes } from "~/router/routes.service";
import { QUESTION_ROUTES } from "~/router/routes/question.route";

export function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <LayoutRoutes routes={AUTH_ROUTES} />
      <LayoutRoutes routes={QUESTION_ROUTES} />
    </BrowserRouter>
  );
}
