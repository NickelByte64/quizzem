import {
  DialogContent as MuiDialogContent,
  type DialogContentProps as MuiDialogContentProps,
} from "@mui/material";
import { type JSX } from "react";

export function DialogContent(
  props: Readonly<MuiDialogContentProps>,
): JSX.Element {
  const { children, ...rest } = props;
  return (
    <MuiDialogContent sx={{ mt: 2 }} {...rest}>
      {children}
    </MuiDialogContent>
  );
}
