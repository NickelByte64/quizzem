import type { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";
import { cx } from "tailwind-variants";
import { BaseInputMessage } from "~/src/components/form/base-input/base-input-message";
import { BaseInputOptionals } from "~/src/components/form/base-input/base-input-optionals";
import { InputError } from "~/src/components/form/input/input-error";
import { InputLabel } from "~/src/components/form/input/input-label";
import { InputLength } from "~/src/components/form/input/input-length";
import { InputRoot } from "~/src/components/form/input/input-root";
import { useInputContext } from "~/src/components/form/input/input.context";

type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "onChange"
> & {
  hasError?: boolean;
  onChange?: (value: string) => void;
};

export function Input(props: Readonly<InputProps>): JSX.Element {
  const { onChange, value, name, hasError = false, ...rest } = props;

  const { error } = useInputContext();

  return (
    <input
      className={cx(
        "rounded-sm mt-1 mb-2 px-2 py-1 border font-normal",
        error?.length ? "text-error border-error" : "border-neutral-600",
      )}
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      {...rest}
    />
  );
}

Input.Root = InputRoot;
Input.Label = InputLabel;
Input.Length = InputLength;
Input.Error = InputError;
Input.Optionals = BaseInputOptionals;
Input.Message = BaseInputMessage;
