import { JSX, PropsWithChildren } from "react";

type LabelInputProps = PropsWithChildren & {
  label: string;
  required?: boolean;
};

export function LabelInput(props: Readonly<LabelInputProps>): JSX.Element {
  const { label, children, required } = props;

  return (
    <label className="fieldset pt-0">
      <div className="fieldset-legend pt-0 block">
        <span>{label}</span>
        {required && <span className="text-error"> *</span>}
      </div>

      {children}
    </label>
  );
}
