import {
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { RiArrowRightSLine } from "@remixicon/react";
import { type JSX } from "react";
import { Link, type LinkProps } from "react-router";

export type BreadcrumbsType = Partial<Pick<LinkProps, "to">> & {
  name: string;
};

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbsType[];
};

export function Breadcrumbs(props: Readonly<BreadcrumbsProps>): JSX.Element {
  const { breadcrumbs } = props;

  return (
    <MuiBreadcrumbs
      separator={<RiArrowRightSLine size={"1rem"} />}
      sx={{ mb: 2 }}
    >
      {breadcrumbs.map((breadcrumb) =>
        breadcrumb.to ? (
          <MuiLink key={breadcrumb.name} component={Link} to="/">
            {breadcrumb.name}
          </MuiLink>
        ) : (
          <Typography key={breadcrumb.name}>{breadcrumb.name}</Typography>
        ),
      )}
    </MuiBreadcrumbs>
  );
}
