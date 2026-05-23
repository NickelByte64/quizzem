import { JSX, PropsWithChildren } from "react";
import { useInputContext } from "~/components/form-item/input/input.context";

type InputLabelProps = PropsWithChildren & {
  label: string;
};

/**
 * LabelInput component renders a label with an optional required indicator.
 * @see Input
 */
export function InputLabel(props: Readonly<InputLabelProps>): JSX.Element {
  const { children, label } = props;

  const { required } = useInputContext();

  return (
    <fieldset className="fieldset pt-0">
      <legend className="fieldset-legend text-sm pt-0 block mb-2">
        {label} {required && <span className="text-error"> *</span>}
      </legend>

      {children}
    </fieldset>
  );
}
