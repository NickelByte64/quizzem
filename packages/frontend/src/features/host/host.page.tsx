import type { JSX } from "react";
import { CreateGame } from "~/src/features/host/components/create-game";
import { EditGame } from "~/src/features/host/components/edit-game";

export function HostPage(): JSX.Element {
  return (
    <>
      <h1>Host Page</h1>
      <CreateGame />
      <EditGame />
    </>
  );
}
