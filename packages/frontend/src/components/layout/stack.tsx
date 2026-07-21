import {
  Stack as MuiStack,
  type StackProps as MuiStackProps,
} from "@mui/material";
import type { JSX } from "react";

export function Stack(props: Readonly<MuiStackProps>): JSX.Element {
  const { children, ...rest } = props;
  return <MuiStack {...rest}>{children}</MuiStack>;
}
