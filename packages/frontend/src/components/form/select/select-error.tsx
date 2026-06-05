import type { JSX } from "react";
import { BaseInputError } from "~/src/components/form/base-input/base-input-error";
import { useSelectContext } from "~/src/components/form/select/select.context";

export function SelectError(): JSX.Element {
  const { error } = useSelectContext();

  return <BaseInputError error={error} />;
}
