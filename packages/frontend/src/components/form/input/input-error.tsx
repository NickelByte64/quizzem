import type { JSX } from "react";
import { BaseInputError } from "~/src/components/form/base-input/base-input-error";
import { useInputContext } from "~/src/components/form/input/input.context";

export function InputError(): JSX.Element {
  const { error } = useInputContext();

  return <BaseInputError error={error} />;
}
