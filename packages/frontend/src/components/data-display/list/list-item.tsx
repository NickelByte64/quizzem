import {
  ListItem as MuiListItem,
  type ListItemProps as MuiListItemProps,
} from "@mui/material";
import type { JSX } from "react";

export function ListItem(props: Readonly<MuiListItemProps>): JSX.Element {
  const { children, sx, ...rest } = props;
  return (
    <MuiListItem sx={{ p: 0, ...sx }} {...rest}>
      {children}
    </MuiListItem>
  );
}
