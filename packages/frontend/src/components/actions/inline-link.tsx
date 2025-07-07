import clsx from "clsx";
import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  JSX,
  PropsWithChildren,
} from "react";
import { Link as RouterLink } from "react-router";

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

  const componentProps = {
    ...(Component === RouterLink ? { to } : { href }),
    ...rest,
  };

  return (
    <Component
      className={clsx("underline text-secondary hover:no-underline", className)}
      {...componentProps}
    >
      {children}
    </Component>
  );
}
