import { SignInPage } from "~/pages/auth/sign-in.page";
import { SignUpPage } from "~/pages/auth/sign-up.page";
import { PublicRoute } from "~/router/components/public-route";
import { createRoutes } from "~/router/routes.service";

export const AUTH_ROUTES = createRoutes("/auth", [
  {
    path: "sign-in",
    element: (
      <PublicRoute>
        <SignInPage />
      </PublicRoute>
    ),
  },
  {
    path: "sign-up",
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
]);
