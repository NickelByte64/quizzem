import type { JSX, PropsWithChildren } from "react";
import { CommonInputOptionals } from "~/src/components/form/common/common-input-optionals";

export function InputOptionals(
  props: Readonly<PropsWithChildren>,
): JSX.Element {
  const { children } = props;

  return <CommonInputOptionals>{children}</CommonInputOptionals>;
}
