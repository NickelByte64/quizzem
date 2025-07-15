import { JSX, PropsWithChildren } from "react";
import { EnvService } from "~/utils";

export function PublicRoute(props: Readonly<PropsWithChildren>): JSX.Element {
  const { children } = props;
  return (
    <>
      {EnvService.IS_DEV_ENVIRONMENT && (
        <p className={"text-warning font-bold text-xl"}>Protected Route</p>
      )}

      {children}
    </>
  );
}
