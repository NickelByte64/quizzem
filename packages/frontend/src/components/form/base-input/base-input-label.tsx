import type {
  DetailedHTMLProps,
  JSX,
  LabelHTMLAttributes,
  PropsWithChildren,
} from "react";

type BaseInputLabelProps = PropsWithChildren &
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
    label: string;
  };

export function BaseInputLabel(
  props: Readonly<BaseInputLabelProps>,
): JSX.Element {
  const { label, children, ...rest } = props;

  return (
    <label className="flex flex-col" {...rest}>
      <span className="text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
