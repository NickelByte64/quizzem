import { List as MuiList, type ListProps as MuiListProps } from "@mui/material";
import type { JSX } from "react";
import { ListItem } from "~/src/components/data-display/list/list-item";

export function List(props: Readonly<MuiListProps>): JSX.Element {
  const { children, sx, ...rest } = props;
  return (
    <MuiList sx={{ py: 0, ...sx }} {...rest}>
      {children}
    </MuiList>
  );
}

List.Item = ListItem;
