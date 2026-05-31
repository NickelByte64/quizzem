import type { ButtonHTMLAttributes, DetailedHTMLProps, JSX } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button(props: Readonly<ButtonProps>): JSX.Element {
  const { children, ...rest } = props;
  return <button {...rest}>{children}</button>;
}
