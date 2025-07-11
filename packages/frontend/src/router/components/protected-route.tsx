import { JSX, PropsWithChildren } from "react";

export function ProtectedRoute(
  props: Readonly<PropsWithChildren>
): JSX.Element {
  const { children } = props;
  return <>{children}</>;
}
