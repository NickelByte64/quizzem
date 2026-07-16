import {
  Snackbar as MuiSnackbar,
  type SnackbarProps as MuiSnackbarProps,
} from "@mui/material";
import { type Dispatch, type JSX, type SetStateAction } from "react";
import { Alert, type AlertProps } from "~/src/components/feedback/alert";

type SnackbarProps = {
  alertProps: AlertProps;
  snackBarProps: Omit<MuiSnackbarProps, "open"> & {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
};

export function Snackbar(props: Readonly<SnackbarProps>): JSX.Element {
  const {
    snackBarProps: { open, setOpen, ...rest },
    alertProps,
  } = props;

  function handleClose() {
    setOpen(false);
  }

  return (
    <MuiSnackbar
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      open={open}
      {...rest}
    >
      <Alert onClose={handleClose} sx={{ width: "100%" }} {...alertProps} />
    </MuiSnackbar>
  );
}
