import { JSX, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuth } from "~/utils";

type NavigateBackProps = PropsWithChildren;

export function NavigateBack(props: Readonly<NavigateBackProps>): JSX.Element {
  const { children } = props;

  const { data: authenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
