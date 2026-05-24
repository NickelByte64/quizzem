import type { JSX } from "react";

const ws = new WebSocket("ws://localhost:3000");

export function HostPage(): JSX.Element {
  return (
    <>
      <h1>Host Page</h1>
      <CreateGame />
    </>
  );
}

export function CreateGame(): JSX.Element {
  return (
    <>
      <h1>Create Game</h1>

      <button
        onClick={() => {
          ws.send(
            JSON.stringify({
              event: "next-question",
              data: { gameId: "123" },
            }),
          );
        }}
      >
        Create Game
      </button>
    </>
  );
}
