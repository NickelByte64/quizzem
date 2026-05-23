import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";
import { useInputContext } from "~/components/form-item/input/input.context";

type InputFieldProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "name"
>;

/**
 * The InputField component is a simple input field.
 */
export function InputField(props: Readonly<InputFieldProps>): JSX.Element {
  const { hasErrors } = useInputContext();

  return (
    <input
      className={clsx("input w-full", hasErrors && "input-error")}
      data-component-name={InputField.name}
      {...props}
    />
  );
}
