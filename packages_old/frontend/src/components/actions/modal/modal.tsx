import clsx from "clsx";
import { JSX, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { ModalActions } from "~/components/actions/modal/modal-actions";
import { ModalBody } from "~/components/actions/modal/modal-body";
import { ModalHeadline } from "~/components/actions/modal/modal-headline";

type ModalProps = PropsWithChildren & {
  open: boolean;
  variant?: "neutral" | "warning" | "error";
  size?: "sm" | "md" | "lg";
};

function ModalContent(props: Readonly<ModalProps>): JSX.Element {
  const { children, open, variant = "neutral", size = "md" } = props;

  return (
    <dialog open={open} className="modal">
      <div
        className={clsx(
          "modal-box border",
          borderStyles[variant],
          sizeStyles[size]
        )}
      >
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
Modal.Body = ModalBody;

const borderStyles = {
  neutral: "",
  warning: "border-warning",
  error: "border-error",
};

const sizeStyles = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
};
