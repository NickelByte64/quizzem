import type { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";
import { BaseInput } from "~/src/components/form/base-input";

type TextInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "onChange"
> & {
  onChange?: (value: string) => void;
};

export function TextInput(props: Readonly<TextInputProps>): JSX.Element {
  return <BaseInput type="text" {...props} />;
}
