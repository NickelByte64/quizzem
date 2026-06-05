import type { JSX } from "react";
import { cx } from "tailwind-variants";
import { useInputContext } from "~/src/components/form/input/input.context";

type InputLengthProps = {
  value: string;
};

export function InputLength(
  props: Readonly<InputLengthProps>,
): JSX.Element | null {
  const { value } = props;
  const { maxLength } = useInputContext();

  if (maxLength === undefined) return null;

  const isExceeded = value.length >= maxLength;

  return (
    <span className={cx("ml-auto", isExceeded && "text-error")}>
      {value.length}/{maxLength}
    </span>
  );
}
