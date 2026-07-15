import type { JSX } from "react";
import { CommonInputError } from "~/src/components/form/common/common-input-error";
import { useSelectContext } from "~/src/components/form/select/select-root";

export function SelectError(): JSX.Element {
  const { error } = useSelectContext();

  return <CommonInputError error={error} />;
}
