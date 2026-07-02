import type { JSX, PropsWithChildren } from "react";
import { cx } from "tailwind-variants";

type CheckboxLabelProps = PropsWithChildren & {
  label: string;
  disabled?: boolean;
};

export function CheckboxLabel(
  props: Readonly<CheckboxLabelProps>,
): JSX.Element {
  const { label, children, disabled = false } = props;

  return (
    <label className={cx("flex flex-row items-center gap-2")}>
      {children}
      <span
        className={cx("text-sm font-semibold", disabled && "text-neutral-400")}
      >
        {label}
      </span>
    </label>
  );
}
