import {
  Typography as MuiTypography,
  type TypographyProps as MuiTypographyProps,
} from "@mui/material";
import type { JSX } from "react";

export function Typography(props: Readonly<MuiTypographyProps>): JSX.Element {
  const { children, ...rest } = props;
  return <MuiTypography {...rest}>{children}</MuiTypography>;
}
