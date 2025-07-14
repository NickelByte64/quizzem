import { JSX, PropsWithChildren } from "react";

export function ProtectedRoute(
  props: Readonly<PropsWithChildren>
): JSX.Element {
  const { children } = props;

  const isLoading = false; // Simulating loading state, replace with actual loading logic
  const isAuthenticated = false;

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated)
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You must be logged in to view this page.</p>
      </div>
    );

  return <>{children}</>;
}
