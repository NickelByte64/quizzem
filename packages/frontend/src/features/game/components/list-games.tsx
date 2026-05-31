import type { JSX } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/src/components";
import { GameApi } from "~/src/features/game/api/game.api";

export function ListGames(): JSX.Element {
  const navigate = useNavigate();

  const { useGetGameListApi } = GameApi;

  const { data } = useGetGameListApi();

  return (
    <>
      <h2>List Games</h2>
      <ul>
        {data?.data.map((game) => (
          <li key={game.id}>
            <span>{game.title}</span>
            <Button onClick={() => navigate(`/games/${game.id}`)}>Edit</Button>
          </li>
        ))}
      </ul>
    </>
  );
}
