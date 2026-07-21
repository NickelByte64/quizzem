import { FormHelperText as MuiFormHelperText, useTheme } from "@mui/material";
import type { JSX } from "react";
import type { FieldError } from "react-hook-form";

type CommonInputErrorProps = {
  error: FieldError["message"];
};

export function CommonInputError(
  props: Readonly<CommonInputErrorProps>,
): JSX.Element | null {
  const { error } = props;
  const { palette, typography } = useTheme();

  if (!error) return null;

  return (
    <MuiFormHelperText
      sx={{ color: palette.error.main, fontSize: typography.caption }}
    >
      {error}
    </MuiFormHelperText>
  );
}
