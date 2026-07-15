import { Box } from "@mui/material";
import type { JSX } from "react";
import type { FieldError } from "react-hook-form";

export type CommonInputHelperTextProps = {
  error: FieldError["message"];
  helperText: string;
};

export function CommonInputHelperText(
  props: Readonly<CommonInputHelperTextProps>,
): JSX.Element | null {
  const { error, helperText } = props;

  if (error) return null;

  return <Box component={"span"}>{helperText}</Box>;
}
