import { JSX, PropsWithChildren } from "react";
import { Button } from "~/components/actions/button";

type ModalActionsProps = PropsWithChildren & {
  onClose: () => void;
};

export function ModalActions(props: Readonly<ModalActionsProps>): JSX.Element {
  const { children, onClose } = props;

  return (
    <div className="modal-action">
      <Button variant="neutral" onClick={onClose}>
        Schließen
      </Button>
      {children}
    </div>
  );
}
