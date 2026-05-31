import type {
  DetailedHTMLProps,
  JSX,
  LabelHTMLAttributes,
  PropsWithChildren,
} from "react";

type LabelInputProps = PropsWithChildren &
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> & {
    label: string;
  };

export function LabelInput(props: Readonly<LabelInputProps>): JSX.Element {
  const { children, label, ...rest } = props;

  return (
    <>
      <label {...rest}>{label}</label>
      {children}
    </>
  );
}
