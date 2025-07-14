import { JSX, PropsWithChildren } from "react";
import { useAuth } from "~/utils";

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

  if (isLoading) return <div>Loading...</div>;

  if (!authenticated)
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be logged in to view this page.</p>
      </div>
    );

  return <>{children}</>;
}
