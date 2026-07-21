import type { JSX, PropsWithChildren } from "react";
import { List } from "~/src/components";
import { useTheme } from "~/src/styling";

type ListItemCardProps = PropsWithChildren;

export function ListItemCard(props: Readonly<ListItemCardProps>): JSX.Element {
  const { children } = props;

  const { shape, palette, shadow } = useTheme();

  return (
    <List.Item
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        border: `1px solid ${palette.primary.main}`,
        px: 2,
        py: 1,
        borderRadius: shape.borderRadiusMd,
        backgroundColor: palette.background.paper,
        boxShadow: shadow.md,
      }}
    >
      {children}
    </List.Item>
  );
}
