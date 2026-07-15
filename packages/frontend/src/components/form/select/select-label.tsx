import type { JSX, PropsWithChildren } from "react";
import { CommonInputLabel } from "~/src/components/form/common/common-input-label";
import { useSelectContext } from "~/src/components/form/select/select-root";

export function SelectLabel(props: Readonly<PropsWithChildren>): JSX.Element {
  const { children } = props;

  const { label, isRequired } = useSelectContext();

  return (
    <CommonInputLabel label={label} isRequired={isRequired}>
      {children}
    </CommonInputLabel>
  );
}
