import type { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";

type BaseInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "onChange"
> & {
  onChange?: (value: string) => void;
};

export function BaseInput(props: Readonly<BaseInputProps>): JSX.Element {
  const { onChange, value, name, ...rest } = props;
  return (
    <input
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...rest}
    />
  );
}
