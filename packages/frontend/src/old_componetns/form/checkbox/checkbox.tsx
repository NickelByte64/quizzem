import type { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";
import { CheckboxLabel } from "~/src/components/form/checkbox/checkbox-label";

type CheckboxProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type" | "onChange" | "value" | "checked"
> & {
  value?: boolean;
  onChange?: (value: boolean) => void;
};

export function Checkbox({
  value,
  onChange,
  ...props
}: Readonly<CheckboxProps>): JSX.Element {
  return (
    <input
      type="checkbox"
      className="cursor-pointer disabled:cursor-not-allowed"
      {...props}
      checked={value}
      onChange={(e) => onChange?.(e.target.checked)}
    />
  );
}

Checkbox.Label = CheckboxLabel;
