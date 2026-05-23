import { JSX, PropsWithChildren, useMemo } from "react";
import { FieldErrors, FieldPath, FieldValues, get } from "react-hook-form";
import { InputError } from "~/components/form-item/input/input-error";
import { InputField } from "~/components/form-item/input/input-field";
import { InputHelper } from "~/components/form-item/input/input-helper";
import { InputLabel } from "~/components/form-item/input/input-label";
import { InputSkeleton } from "~/components/form-item/input/input-skeleton";
import { InputContext } from "~/components/form-item/input/input.context";

type InputProps<T extends FieldValues> = PropsWithChildren & {
  name?: FieldPath<T>;
  errors?: FieldErrors<T>;
  required?: boolean;
  errorMessage?: string;
};

/**
 * Input component that provides a context for its children.
 * It includes an input field, a label, and an error message.
 */
export function Input<T extends FieldValues>(
  props: Readonly<InputProps<T>>
): JSX.Element {
  const { children, name, errors, required = false, errorMessage } = props;

  const hasErrors = !!get(errors, name);

  const value = useMemo(
    () => ({
      required,
      hasErrors,
      errorMessage,
    }),
    [required, hasErrors, errorMessage]
  );

  return (
    <InputContext.Provider value={value}>{children}</InputContext.Provider>
  );
}

Input.InputField = InputField;
Input.Label = InputLabel;
Input.Error = InputError;
Input.Helper = InputHelper;
Input.Skeleton = InputSkeleton;
