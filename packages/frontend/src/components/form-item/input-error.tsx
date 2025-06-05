import { JSX } from "react";

type InputErrorProps = {
  message?: string;
};

export function InputError(props: Readonly<InputErrorProps>): JSX.Element {
  const { message } = props;

  if (!message) {
    return <></>;
  }

  return <span className="text-error text-sm">{message}</span>;
}
