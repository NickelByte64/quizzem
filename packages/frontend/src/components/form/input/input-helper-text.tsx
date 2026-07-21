import { Box } from "@mui/material";
import type { JSX } from "react";
import { useInputContext } from "~/src/components/form/input/input-root";

export function InputHelperText(): JSX.Element | null {
  const { error, helperText } = useInputContext();

  if (error) return null;

  return <Box component={"span"}>{helperText}</Box>;
}
