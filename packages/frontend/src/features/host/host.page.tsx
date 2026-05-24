import type { JSX } from "react";
import { CreateGame } from "~/src/features/host/components/create-game";
import { LoadGame } from "~/src/features/host/components/load-game";

export function HostPage(): JSX.Element {
  return (
    <>
      <h1>Host Page</h1>
      <CreateGame />
      <LoadGame />
    </>
  );
}
