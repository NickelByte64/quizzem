import { DialogTitle as MuiDialogTitle } from "@mui/material";
import { type JSX } from "react";
import { useDialogContext } from "~/src/components/feedback/dialog/dialog-root";

export function DialogTitle(): JSX.Element {
  const { label } = useDialogContext();
  return <MuiDialogTitle sx={{ m: 0 }}>{label}</MuiDialogTitle>;
}
