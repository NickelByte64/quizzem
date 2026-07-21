import {
  DialogActions as MuiDialogActions,
  type DialogActionsProps as MuiDialogActionsProps,
} from "@mui/material";
import { type JSX } from "react";
import { Button } from "~/src/components/actions";
import { useDialogContext } from "~/src/components/feedback/dialog/dialog-root";

export function DialogActions(
  props: Readonly<MuiDialogActionsProps>,
): JSX.Element {
  const { children, ...rest } = props;

  const { onClose } = useDialogContext();

  return (
    <MuiDialogActions {...rest}>
      <Button variant="outlined" onClick={onClose}>
        Cancel
      </Button>
      {children}
    </MuiDialogActions>
  );
}
