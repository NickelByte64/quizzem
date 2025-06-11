import clsx from "clsx";
import { JSX, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { ModalActions } from "~/components/actions/modal/modal-actions";
import { ModalHeadline } from "~/components/actions/modal/modal-headline";

type ModalProps = PropsWithChildren & {
  open: boolean;
  variant?: "neutral" | "warning" | "error";
};

function ModalContent(props: Readonly<ModalProps>): JSX.Element {
  const { children, open, variant = "neutral" } = props;

  return (
    <dialog open={open} className="modal">
      <div className={clsx("modal-box border", borderStyles[variant])}>
        {children}
      </div>
    </dialog>
  );
}

export function Modal(props: Readonly<ModalProps>): JSX.Element {
  return createPortal(<ModalContent {...props} />, document.body);
}

Modal.Actions = ModalActions;
Modal.Headline = ModalHeadline;

const borderStyles = {
  neutral: "",
  warning: "border-warning",
  error: "border-error",
};
