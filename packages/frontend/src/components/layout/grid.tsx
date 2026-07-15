import { Grid as MuiGrid, type GridProps as MuiGridProps } from "@mui/material";
import type { JSX } from "react";

export function Grid(props: Readonly<MuiGridProps>): JSX.Element {
  const { children, ...rest } = props;
  return <MuiGrid {...rest}>{children}</MuiGrid>;
}
