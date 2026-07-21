import {
  Divider as MuiDivider,
  type DividerProps as MuiDividerProps,
} from "@mui/material";

export function Divider(props: Readonly<MuiDividerProps>) {
  const { sx, ...rest } = props;
  return <MuiDivider sx={{ my: 2, ...sx }} {...rest} />;
}
