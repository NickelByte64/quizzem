import type { JSX } from "react";
import { Skeleton } from "~/src/components";
import { useTheme } from "~/src/styling";

export function ListItemCardSkeleton(): JSX.Element {
  const { shape, shadow } = useTheme();

  return (
    <Skeleton
      width={"100%"}
      height={"54.5px"}
      sx={{ borderRadius: shape.borderRadiusMd, boxShadow: shadow.md }}
    />
  );
}
