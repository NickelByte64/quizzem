import clsx from "clsx";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  JSX,
  PropsWithChildren,
} from "react";
import { Link as RouterLink } from "react-router";
import { Theme, useTheme } from "~/utils";

type InlineLinkProps = PropsWithChildren &
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {
    Component?: ElementType;
    to?: string;
  };

export function InlineLink(props: Readonly<InlineLinkProps>): JSX.Element {
  const {
    Component = RouterLink,
    children,
    to,
    href,
    className,
    ...rest
  } = props;

  const { theme } = useTheme();

  const componentProps = {
    ...(Component === RouterLink ? { to } : { href }),
    ...rest,
  };

  return (
    <Component
      data-component-name={InlineLink.name}
      className={clsx(
        "underline hover:no-underline",
        className,
        theme === Theme.DRACULA ? "text-secondary" : "text-secondary-content"
      )}
      {...componentProps}
    >
      {children}
    </Component>
  );
}
