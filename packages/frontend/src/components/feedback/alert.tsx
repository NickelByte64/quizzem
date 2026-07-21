import {
  Alert as MuiAlert,
  useTheme,
  type AlertProps as MuiAlertProps,
} from "@mui/material";
import {
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiErrorWarningLine,
  RiInformationLine,
  type RemixiconComponentType,
} from "@remixicon/react";
import type { JSX, ReactNode } from "react";

export type Severity = "info" | "success" | "error" | "warning";

export type AlertProps = Omit<
  MuiAlertProps,
  "children" | "severity" | "variant"
> & {
  title: ReactNode;
  severity?: Severity;
};

export function Alert(props: Readonly<AlertProps>): JSX.Element {
  const { severity = "info", title, ...rest } = props;

  const { shape } = useTheme();
  const Icon = severityIcon[severity];

  return (
    <MuiAlert
      severity={severity}
      sx={{ borderRadius: shape.borderRadiusSm }}
      icon={<Icon />}
      {...rest}
    >
      {title}
    </MuiAlert>
  );
}

const severityIcon: Record<Severity, RemixiconComponentType> = {
  success: RiCheckboxCircleLine,
  info: RiInformationLine,
  warning: RiErrorWarningLine,
  error: RiCloseCircleLine,
};
