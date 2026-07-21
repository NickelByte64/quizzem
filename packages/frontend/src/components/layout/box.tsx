import { Box as MuiBox, type BoxProps as MuiBoxProps } from "@mui/material";
import type { JSX } from "react";

export function Box(props: Readonly<MuiBoxProps>): JSX.Element {
  const { children, ...rest } = props;
  return <MuiBox {...rest}>{children}</MuiBox>;
}
