import type { JSX, PropsWithChildren } from "react";
import { Typography } from "~/src/components/data-display";
import { Breadcrumbs, type BreadcrumbsType } from "~/src/components/navigation";

type LayoutProps = PropsWithChildren & {
  title: string;
  breadcrumbs: BreadcrumbsType[];
};

export function Layout(props: Readonly<LayoutProps>): JSX.Element {
  const { children, breadcrumbs, title } = props;

  return (
    <>
      <Typography variant="h1">{title}</Typography>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      {children}
    </>
  );
}
