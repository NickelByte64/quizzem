import type { UUID } from "node:crypto";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/src/components";

type EditGameProps = {
  id: UUID;
};

export function EditGame(props: Readonly<EditGameProps>): JSX.Element {
  const { id } = props;

  const navigate = useNavigate();

  return (
    <>
      <h2>Edit Game</h2>

      <Button onClick={() => navigate("/games")}>Back to List</Button>
      {id}
    </>
  );
}
