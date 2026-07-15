import { Box, InputLabel as MuiInputLabel } from "@mui/material";
import type { JSX, PropsWithChildren } from "react";
import { useTheme } from "~/src/styling";

type CommonInputLabelProps = PropsWithChildren & {
  label: string;
  isDisabled?: boolean;
  isRequired?: boolean;
};

export function CommonInputLabel(
  props: Readonly<CommonInputLabelProps>,
): JSX.Element {
  const { label, isRequired = false, isDisabled = false, children } = props;

  const { palette } = useTheme();

  return (
    <MuiInputLabel
      sx={{
        display: "flex",
        flexDirection: "column",
        color: isDisabled ? palette.grey[400] : "inherit",
      }}
      size="small"
    >
      <Box component={"span"}>
        {label} {isRequired && "*"}
      </Box>
      {children}
    </MuiInputLabel>
  );
}
