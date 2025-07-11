import { JSX, PropsWithChildren } from "react";

export function PublicRoute(props: Readonly<PropsWithChildren>): JSX.Element {
  const { children } = props;
  return (
    <>
      <div className={"text-warning font-bold text-xl"}>Public Route</div>
      {children}
    </>
  );
}
