import { JSX, PropsWithChildren } from "react";
import { Loading } from "~/components/feedback/loading";
import { AccessDeniedPage } from "~/pages/errors/access-denied.page";
import { EnvService, useAuth } from "~/utils";

/**
 * ProtectedRoute component ensures that the user is authenticated before rendering its children.
 * If the user is not authenticated, it displays an access denied message.
 * TODO - add permissions check after the authentication
 * TODO - add a redirect to the login page with the original path as a query parameter
 */
export function ProtectedRoute(
  props: Readonly<PropsWithChildren>
): JSX.Element {
  const { children } = props;

  const { data: authenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-base-300 flex items-center justify-center">
        <Loading size="xl" />
      </div>
    );

  if (!authenticated) return <AccessDeniedPage />;

  return (
    <>
      {EnvService.IS_DEV_ENVIRONMENT && (
        <p className={"text-warning font-bold text-xl"}>Protected Route</p>
      )}

      {children}
    </>
  );
}
