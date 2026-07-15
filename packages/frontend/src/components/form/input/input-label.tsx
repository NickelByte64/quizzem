import type { JSX, PropsWithChildren } from "react";
import { CommonInputLabel } from "~/src/components/form/common/common-input-label";
import { useInputContext } from "~/src/components/form/input/input-root";

export function InputLabel(props: Readonly<PropsWithChildren>): JSX.Element {
  const { children } = props;

  const { label, isRequired } = useInputContext();

  return (
    <CommonInputLabel label={label} isRequired={isRequired}>
      {children}
    </CommonInputLabel>
  );
}
