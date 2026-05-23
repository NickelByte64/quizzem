import clsx from "clsx";
import {
  DetailedHTMLProps,
  JSX,
  PropsWithChildren,
  SelectHTMLAttributes,
} from "react";

type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  PropsWithChildren;

export function Select(props: Readonly<SelectProps>): JSX.Element {
  const { children, className, ...rest } = props;
  return (
    <select className={clsx("select w-full", className)} {...rest}>
      {children}
    </select>
  );
}
