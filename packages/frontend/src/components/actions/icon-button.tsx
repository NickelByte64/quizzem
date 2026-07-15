import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material";
import type { RemixiconComponentType } from "@remixicon/react";
import type { JSX } from "react";

type IconButtonProps = Omit<MuiIconButtonProps, "children"> & {
  Icon: RemixiconComponentType;
};

export function IconButton(props: Readonly<IconButtonProps>): JSX.Element {
  const { Icon, ...rest } = props;
  return (
    <MuiIconButton {...rest}>
      <Icon />
    </MuiIconButton>
  );
}
