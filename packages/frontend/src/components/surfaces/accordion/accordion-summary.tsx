import {
  AccordionSummary as MuiAccordionSummary,
  Typography,
  useTheme,
  type AccordionSummaryProps as MuiAccordionSummaryProps,
} from "@mui/material";
import { RiArrowDownSLine } from "@remixicon/react";
import type { JSX } from "react";

export function AccordionSummary(
  props: Readonly<MuiAccordionSummaryProps>,
): JSX.Element {
  const { children, sx, ...rest } = props;

  const { palette, typography } = useTheme();

  return (
    <MuiAccordionSummary
      sx={{
        backgroundColor: palette.background.default,
        borderRadius: 5,
        p: 2,
        minHeight: "unset !important",
        "&.Mui-expanded": {
          minHeight: "unset !important",
        },
        "& .MuiAccordionSummary-content": {
          margin: 0,
        },
        "& .MuiAccordionSummary-content.Mui-expanded": {
          margin: 0,
        },
        ...sx,
      }}
      expandIcon={<RiArrowDownSLine />}
      {...rest}
    >
      <Typography
        component="span"
        sx={{ fontWeight: typography.fontWeightBold }}
      >
        {children}
      </Typography>
    </MuiAccordionSummary>
  );
}
