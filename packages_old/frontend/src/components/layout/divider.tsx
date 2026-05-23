import clsx from "clsx";
import { JSX } from "react";

type DividerProps = {
  className?: string;
} & ({ withText: true; text: string } | { withText?: false; text?: never });

export function Divider(props: Readonly<DividerProps>): JSX.Element {
  const { withText = false, text = "oder", className } = props;

  return (
    <div
      className={clsx("divider", className)}
      data-component-name={Divider.name}
    >
      {withText ? text.toUpperCase() : null}
    </div>
  );
}
