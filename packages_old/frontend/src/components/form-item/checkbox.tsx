import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type CheckboxProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export function Checkbox(props: Readonly<CheckboxProps>) {
  return <input type="checkbox" className="checkbox" {...props} />;
}
