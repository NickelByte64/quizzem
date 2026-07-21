import { useState, type JSX } from "react";
import { QueryBoundary, Typography } from "~/src/components";
import { GameApi } from "~/src/features/game/api/game.api";
import { ListGamesContent } from "~/src/features/game/components/list-games/list-games-content";
import { ListGamesEmpty } from "~/src/features/game/components/list-games/list-games-empty";
import { ListGamesError } from "~/src/features/game/components/list-games/list-games-error";
import { ListGamesSkeletons } from "~/src/features/game/components/list-games/list-games-skeletons";

export function ListGames(): JSX.Element {
  const [page, setPage] = useState(0);

  const { useGetGameList } = GameApi;

  const { data, isLoading, isError, refetch } = useGetGameList({ page });

  return (
    <>
      <Typography variant="h2">List Games</Typography>

      <QueryBoundary
        hasContent={data && data.data.totalElements > 0}
        isLoading={isLoading}
        isError={isError}
        skeletons={<ListGamesSkeletons />}
        content={
          <ListGamesContent page={page} setPage={setPage} data={data!} />
        }
        emptyContent={<ListGamesEmpty />}
        error={<ListGamesError refetch={refetch} />}
      />
    </>
  );
}
