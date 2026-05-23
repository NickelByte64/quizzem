import { JSX } from "react";
import { useInputContext } from "~/components/form-item/input/input.context";

export function InputError(): JSX.Element {
  const { errorMessage } = useInputContext();

  if (!errorMessage) return <></>;

  return <span className="text-error text-sm">{errorMessage}</span>;
}
