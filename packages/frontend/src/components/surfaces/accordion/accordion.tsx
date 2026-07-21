import {
  Accordion as MuiAccordion,
  useTheme,
  type AccordionProps as MuiAccordionProps,
} from "@mui/material";
import type { JSX } from "react";
import { AccordionDetails } from "~/src/components/surfaces/accordion/accordion-details";
import { AccordionSummary } from "~/src/components/surfaces/accordion/accordion-summary";

export function Accordion(props: Readonly<MuiAccordionProps>): JSX.Element {
  const { children, ...rest } = props;

  const { palette, shape } = useTheme();

  return (
    <MuiAccordion
      slotProps={{
        region: { sx: { p: 2 } },
        heading: { sx: { backgroundColor: "blue" } },
      }}
      sx={{
        width: "100%",
        boxShadow: "none",
        border: `solid 1px ${palette.primary.main}`,
        "&.MuiPaper-root": {
          borderRadius: shape.borderRadiusMd,
        },
      }}
      {...rest}
    >
      {children}
    </MuiAccordion>
  );
}

Accordion.Details = AccordionDetails;
Accordion.Summary = AccordionSummary;
