import type { JSX } from "react";
import { CommonInputError } from "~/src/components/form/common/common-input-error";
import { useInputContext } from "~/src/components/form/input/input-root";

export function InputError(): JSX.Element {
  const { error } = useInputContext();

  return <CommonInputError error={error} />;
}
