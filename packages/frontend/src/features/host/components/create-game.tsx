import type { JSX } from "react";
import { usePostQuizzemData } from "~/src/api/useQuizzemApi";

export function CreateGame(): JSX.Element {
  const { mutate } = usePostQuizzemData("/hosts/create-game");

  return (
    <>
      <h2>Create Game</h2>

      <button
        onClick={() => mutate(undefined)}
        // onClick={() => {
        //   ws.send(
        //     JSON.stringify({
        //       event: "next-question",
        //       data: { gameId: "123" },
        //     }),
        //   );
        // }}
      >
        Create Game
      </button>
    </>
  );
}
