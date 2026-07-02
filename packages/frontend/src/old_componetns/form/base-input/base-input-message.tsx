import type { JSX } from "react";
import { useInputContext } from "~/src/components/form/input/input.context";

type BaseInputMessageProps = {
  message: string;
};

export function BaseInputMessage(
  props: Readonly<BaseInputMessageProps>,
): JSX.Element | null {
  const { message } = props;

  const { error } = useInputContext();

  if (error) return null;

  return <span>{message}</span>;
}
