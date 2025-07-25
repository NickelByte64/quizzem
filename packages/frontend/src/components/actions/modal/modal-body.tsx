import { JSX, PropsWithChildren } from "react";

type ModalBodyProps = PropsWithChildren;

export function ModalBody(props: Readonly<ModalBodyProps>): JSX.Element {
  const { children } = props;

  return <div className="my-8">{children}</div>;
}
