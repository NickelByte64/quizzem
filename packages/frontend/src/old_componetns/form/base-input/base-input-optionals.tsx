import type { JSX, PropsWithChildren } from "react";

type BaseInputOptionalsProps = PropsWithChildren;

export function BaseInputOptionals(
  props: Readonly<BaseInputOptionalsProps>,
): JSX.Element {
  const { children } = props;

  return (
    <div className="flex flex-row text-sm text-neutral-600">{children}</div>
  );
}
