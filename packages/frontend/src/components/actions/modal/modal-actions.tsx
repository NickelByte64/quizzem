import { Dispatch, JSX, PropsWithChildren, SetStateAction } from "react";
import { Button } from "~/components/actions/button";

type ModalActionsProps = PropsWithChildren & {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function ModalActions(props: Readonly<ModalActionsProps>): JSX.Element {
  const { children, setOpen } = props;

  return (
    <div className="modal-action">
      <Button variant="neutral" onClick={() => setOpen(false)}>
        Schließen
      </Button>
      {children}
    </div>
  );
}
