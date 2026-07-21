import type { UUID } from "node:crypto";
import type { PageableDto } from "~/src/api/api.types";
import {
  useDeleteQuizzemData,
  useGetQuizzemData,
  usePatchQuizzemData,
  usePostQuizzemData,
  type UseQuizzemMutation,
  type UseQuizzemQuery,
} from "~/src/api/useQuizzemApi";
import type {
  CreateGameDto,
  CreateGameResponseDto,
  GameDto,
  GetAllGamesParamsDto,
  UpdateGameDto,
} from "~/src/features/game/api/game.types";

export const ROOT_GAMES_TARGET = "/games";

function useCreateGame(): UseQuizzemMutation<
  CreateGameDto,
  CreateGameResponseDto
> {
  return usePostQuizzemData<CreateGameDto, CreateGameResponseDto>(
    ROOT_GAMES_TARGET,
  );
}

function useGetGameList(
  params: GetAllGamesParamsDto,
): UseQuizzemQuery<PageableDto<GameDto>> {
  const searchParams = new URLSearchParams({
    page: String(params?.page ?? 0),
    size: String(params?.size ?? 20),
  });

  const url = `${ROOT_GAMES_TARGET}?${searchParams}`;
  return useGetQuizzemData<PageableDto<GameDto>>(url);
}

function useUpdateGame(id: UUID): UseQuizzemMutation<UpdateGameDto, void> {
  const url = `${ROOT_GAMES_TARGET}/${id}`;
  return usePatchQuizzemData<UpdateGameDto, void>(url);
}

function useDeleteGame(id: UUID): UseQuizzemMutation<void, void> {
  const url = `${ROOT_GAMES_TARGET}/${id}`;
  return useDeleteQuizzemData<void>(url);
}

function useGetGameById(id: UUID): UseQuizzemQuery<GameDto> {
  const url = `${ROOT_GAMES_TARGET}/${id}`;
  return useGetQuizzemData<GameDto>(url);
}

export const GameApi = {
  useCreateGame,
  useGetGameList,
  useUpdateGame,
  useDeleteGame,
  useGetGameById,
};
