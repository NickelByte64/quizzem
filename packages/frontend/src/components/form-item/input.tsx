import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes, JSX } from "react";
import { FieldErrors, FieldPath, FieldValues, get } from "react-hook-form";

type InputProps<T extends FieldValues> = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "name"
> & {
  errors?: FieldErrors<T>;
  name?: FieldPath<T>;
};

export function Input<T extends FieldValues>(
  props: Readonly<InputProps<T>>
): JSX.Element {
  const { errors, name, ...rest } = props;

  const hasErrors = !!get(errors, name);

  return (
    <input
      name={name}
      className={clsx("input w-full", hasErrors && "input-error")}
      {...rest}
    />
  );
}
