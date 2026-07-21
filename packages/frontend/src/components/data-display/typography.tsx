import {
  Typography as MuiTypography,
  type TypographyProps as MuiTypographyProps,
} from "@mui/material";
import type { JSX } from "react";

type TypographyProps = MuiTypographyProps & {
  ellipsis?: boolean;
};

export function Typography(props: Readonly<TypographyProps>): JSX.Element {
  const { ellipsis = false, children, sx, ...rest } = props;

  const ellipsisStyles = ellipsis
    ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
    : undefined;

  return (
    <MuiTypography sx={{ ...ellipsisStyles, ...sx }} {...rest}>
      {children}
    </MuiTypography>
  );
}
