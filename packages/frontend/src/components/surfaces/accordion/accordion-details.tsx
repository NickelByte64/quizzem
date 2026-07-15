import {
  AccordionDetails as MuiAccordionDetails,
  type AccordionDetailsProps as MuiAccordionDetailsProps,
} from "@mui/material";
import type { JSX } from "react";

export function AccordionDetails(
  props: Readonly<MuiAccordionDetailsProps>,
): JSX.Element {
  const { children, sx, ...rest } = props;
  return (
    <MuiAccordionDetails sx={{ px: 0, ...sx }} {...rest}>
      {children}
    </MuiAccordionDetails>
  );
}
