import {
  AccordionSummary as MuiAccordionSummary,
  useTheme,
  type AccordionSummaryProps as MuiAccordionSummaryProps,
} from "@mui/material";
import { RiArrowDownSLine } from "@remixicon/react";
import type { JSX } from "react";
import { Typography } from "~/src/components/data-display";

export function AccordionSummary(
  props: Readonly<MuiAccordionSummaryProps>,
): JSX.Element {
  const { children, sx, ...rest } = props;

  const { palette, typography, shape } = useTheme();

  return (
    <MuiAccordionSummary
      sx={{
        backgroundColor: palette.background.default,
        borderRadius: shape.borderRadiusMd,
        p: 2,
        minHeight: "unset !important",
        "&.Mui-expanded": {
          minHeight: "unset !important",
        },
        "& .MuiAccordionSummary-content": {
          margin: 0,
          minWidth: 0,
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
        ellipsis
        sx={{
          fontWeight: typography.fontWeightBold,
        }}
      >
        {children}
      </Typography>
    </MuiAccordionSummary>
  );
}
