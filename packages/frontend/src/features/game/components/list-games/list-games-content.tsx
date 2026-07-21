import dayjs from "dayjs";
import type { UUID } from "node:crypto";
import { useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { useNavigate } from "react-router";
import type { PageableDto } from "~/src/api/api.types";
import type { HttpResponse } from "~/src/api/http";
import { QUERY_CLIENT } from "~/src/api/query-client";
import {
  Button,
  List,
  Pagination,
  Snackbar,
  Stack,
  Typography,
} from "~/src/components";
import { GameApi, ROOT_GAMES_TARGET } from "~/src/features/game/api/game.api";
import type { GameDto } from "~/src/features/game/api/game.types";

type ListGamesContentProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: HttpResponse<PageableDto<GameDto>>;
};

export function ListGamesContent(
  props: Readonly<ListGamesContentProps>,
): JSX.Element {
  const { page, setPage, data } = props;

  const navigate = useNavigate();

  function handlePageChange(newPage: number): void {
    setPage(newPage);
  }

  return (
    <>
      <List sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        {data.data.data.map((game) => (
          <List.ItemCard key={game.id}>
            <Typography component={"span"} ellipsis sx={{ flex: 1 }}>
              {game.title}
            </Typography>
            <Typography component={"span"}>
              {dayjs(game.createdAt).format("DD. MMM YYYY, hh:mm:ss")}
            </Typography>
            <Typography component={"span"}>
              Questions: {game.questions.length}
            </Typography>

            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/games/${game.id}`)}
              >
                Edit
              </Button>
              <DeleteButton id={game.id} />
            </Stack>
          </List.ItemCard>
        ))}
      </List>

      <Pagination
        page={page}
        totalPages={data.data.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

function DeleteButton(props: Readonly<{ id: UUID }>) {
  const { id } = props;

  const [open, setOpen] = useState(false);

  const { useDeleteGame } = GameApi;
  const { mutate } = useDeleteGame(id);

  return (
    <>
      <Button
        onClick={() => {
          mutate(undefined, {
            onSuccess: () => {
              QUERY_CLIENT.invalidateQueries({
                queryKey: [ROOT_GAMES_TARGET],
              });
            },
            onError: () => {
              setOpen(true);
            },
          });
        }}
      >
        Delete
      </Button>

      <Snackbar
        alertProps={{
          title: "Game could not be deleted",
          severity: "error",
        }}
        snackBarProps={{ open, setOpen }}
      />
    </>
  );
}
