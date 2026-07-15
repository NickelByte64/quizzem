import type { Breakpoint } from "@mui/material";
import {
  createContext,
  useContext,
  useMemo,
  type JSX,
  type PropsWithChildren,
} from "react";

type DialogContextValues = {
  label: string;
  open: boolean;
  onClose: () => void;
  width: Breakpoint;
};

const DialogContext = createContext<DialogContextValues | undefined>(undefined);

type DialogRootProps = PropsWithChildren & {
  label: string;
  open: boolean;
  onClose: () => void;
  width?: Breakpoint;
};

export function DialogRoot(props: Readonly<DialogRootProps>): JSX.Element {
  const { label, children, open, onClose, width = "md" } = props;

  const value: DialogContextValues = useMemo(
    () => ({
      label,
      open,
      onClose,
      width,
    }),
    [label, open, onClose, width],
  );

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}

export function useDialogContext(): DialogContextValues {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("DialogContext must be wrapped with an DialogRoot.");
  }
  return context;
}
