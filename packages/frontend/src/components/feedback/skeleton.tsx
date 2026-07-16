import {
  Skeleton as MuiSkeleton,
  type SkeletonProps as MuiSkeletonProps,
} from "@mui/material";
import type { JSX } from "react";

export function Skeleton(props: Readonly<MuiSkeletonProps>): JSX.Element {
  const { sx, ...rest } = props;

  return <MuiSkeleton sx={{ transform: "unset", ...sx }} {...rest} />;
}
