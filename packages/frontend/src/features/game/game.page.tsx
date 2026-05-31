import type { UUID } from "node:crypto";
import { type JSX } from "react";
import { useParams } from "react-router";
import { CreateGame } from "~/src/features/game/components/create-game";
import { EditGame } from "~/src/features/game/components/edit-game";
import { ListGames } from "~/src/features/game/components/list-games";

export function GamePage(): JSX.Element {
  const { id } = useParams<{ id: UUID }>();

  return (
    <>
      <h1>Game Page</h1>
      {id ? (
        <EditGame id={id} />
      ) : (
        <>
          <CreateGame />
          <ListGames />
        </>
      )}
    </>
  );
}
