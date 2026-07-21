import type { JSX } from "react";
import { useCheckboxContext } from "~/src/components/form/checkbox/checkbox-root";
import { CommonInputLabel } from "~/src/components/form/common/common-input-label";

export function CheckboxLabel(): JSX.Element {
  const { label, isDisabled } = useCheckboxContext();

  return <CommonInputLabel isDisabled={isDisabled} label={label} />;
}
