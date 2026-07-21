import { Box } from "@mui/material";
import type { JSX } from "react";
import { useSelectContext } from "~/src/components/form/select/select-root";

export function SelectHelperText(): JSX.Element | null {
  const { error, helperText } = useSelectContext();

  if (error) return null;

  return <Box component={"span"}>{helperText}</Box>;
}
