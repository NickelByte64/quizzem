import type { JSX, PropsWithChildren } from "react";

type AccordionGroupProps = PropsWithChildren;

export function AccordionGroup(
  props: Readonly<AccordionGroupProps>,
): JSX.Element {
  const { children } = props;

  return <div>{children}</div>;
}
