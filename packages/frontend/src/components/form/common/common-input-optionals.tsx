import { Stack } from "@mui/material";
import type { JSX, PropsWithChildren } from "react";

export function CommonInputOptionals(
  props: Readonly<PropsWithChildren>,
): JSX.Element {
  const { children } = props;
  return <Stack>{children}</Stack>;
}
