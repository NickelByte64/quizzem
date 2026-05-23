import clsx from "clsx";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  JSX,
  PropsWithChildren,
} from "react";

type HeadlineProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> &
  PropsWithChildren & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    defaultMargin?: boolean;
  };

export function Headline(props: Readonly<HeadlineProps>): JSX.Element {
  const {
    as = "h1",
    children,
    className,
    defaultMargin = true,
    ...rest
  } = props;

  const Component = as;

  return (
    <Component
      className={clsx(headlineStyles[as], defaultMargin && "my-4", className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

const headlineStyles = {
  h1: "text-3xl font-bold leading-snug",
  h2: "text-2xl font-bold leading-snug",
  h3: "text-xl font-bold leading-snug",
  h4: "text-lg font-bold leading-snug",
  h5: "text-base font-bold leading-snug",
  h6: "text-sm font-bold leading-snug",
};
