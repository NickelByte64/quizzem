import type { JSX } from "react";

type BaseInputErrorProps = {
  error?: string;
};

export function BaseInputError(
  props: Readonly<BaseInputErrorProps>,
): JSX.Element | null {
  const { error } = props;

  if (!error) return null;

  return <span className="text-sm text-error">{error}</span>;
}
