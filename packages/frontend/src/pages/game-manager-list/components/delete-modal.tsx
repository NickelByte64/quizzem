import { GameDto } from "@quizzem/common";
import { Dispatch, JSX, SetStateAction } from "react";
import { Button, Modal } from "~/components";

type DeleteModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  game: GameDto | null;
};

export function DeleteModal(props: Readonly<DeleteModalProps>): JSX.Element {
  const { open, setOpen, game } = props;

  return (
    <Modal open={open} variant="error">
      <Modal.Headline>Spiel löschen</Modal.Headline>
      {!game ? (
        <div className="text-error">
          <span>Es wurde kein Spiel ausgewählt.</span>
        </div>
      ) : (
        <div>
          <span>Möchtest du das Spiel</span>
          <span className="font-bold"> {game.name} </span>
          <span>wirklich löschen?</span>
        </div>
      )}
      <Modal.Actions setOpen={setOpen}>
        {game && (
          <Button
            variant="error"
            onClick={() => {
              setOpen(false);
            }}
          >
            Löschen
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
}
