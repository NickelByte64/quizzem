import type {
  DetailedHTMLProps,
  JSX,
  LabelHTMLAttributes,
  PropsWithChildren,
} from "react";
import { BaseInputLabel } from "~/src/components/form/base-input/base-input-label";
import { useInputContext } from "~/src/components/form/input/input.context";

type InputLabelProps = PropsWithChildren &
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
    label: string;
  };

export function InputLabel(props: Readonly<InputLabelProps>): JSX.Element {
  const { label, ...rest } = props;

  const { isRequired } = useInputContext();

  return <BaseInputLabel label={label} isRequired={isRequired} {...rest} />;
}
