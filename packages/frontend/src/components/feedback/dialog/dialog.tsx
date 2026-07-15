import { Dialog as MuiDialog, useTheme } from "@mui/material";
import type { JSX, PropsWithChildren } from "react";
import { DialogActions } from "~/src/components/feedback/dialog/dialog-actions";
import { DialogContent } from "~/src/components/feedback/dialog/dialog-content";
import {
  DialogRoot,
  useDialogContext,
} from "~/src/components/feedback/dialog/dialog-root";
import { DialogTitle } from "~/src/components/feedback/dialog/dialog-title";

export function Dialog(props: Readonly<PropsWithChildren>): JSX.Element {
  const { children } = props;

  const { breakpoints } = useTheme();
  const { open, width } = useDialogContext();

  const computedWidthPx = breakpoints.values[width];

  return (
    <MuiDialog
      slotProps={{
        paper: {
          sx: {
            borderRadius: "1rem",
            px: 2,
            py: 1,
            width: computedWidthPx,
            maxWidth: computedWidthPx,
          },
        },
      }}
      open={open}
    >
      {children}
    </MuiDialog>
  );
}

Dialog.Root = DialogRoot;
Dialog.Title = DialogTitle;
Dialog.Actions = DialogActions;
Dialog.Content = DialogContent;
