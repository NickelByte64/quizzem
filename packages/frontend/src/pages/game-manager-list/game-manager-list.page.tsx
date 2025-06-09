import { GameDto, PageableDto } from "@quizzem/common";
import { JSX } from "react";
import { Headline, Layout } from "~/components";
import { useGetRemote } from "~/utils";

export function GameManagerListPage(): JSX.Element {
  const { data } = useGetRemote<PageableDto<GameDto>>("game");

  return (
    <Layout>
      <Headline>Game Manager List</Headline>
      {data?.data.map((game) => (
        <div key={game.id}>id: {game.id}</div>
      ))}
    </Layout>
  );
}
