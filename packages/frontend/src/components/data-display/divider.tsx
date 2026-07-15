import {
  Divider as MuiDivider,
  type DividerProps as MuiDividerProps,
} from "@mui/material";

export function Divider(props: Readonly<MuiDividerProps>) {
  const { ...rest } = props;
  return <MuiDivider {...rest} />;
}
