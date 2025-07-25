type InputHelperProps = {
  helperText: string;
};

/**
 * InputHelper component displays helper text for input fields.
 */
export function InputHelper(props: Readonly<InputHelperProps>) {
  const { helperText } = props;
  return <p className="label text-sm">{helperText}</p>;
}
