import type { UUID } from "node:crypto";
import type { JSX } from "react";

type EditGameProps = {
  id: UUID;
};

export function EditGame(props: Readonly<EditGameProps>): JSX.Element {
  const { id } = props;

  return (
    <>
      <h2>Edit Game</h2>
      {id}
    </>
  );
}
