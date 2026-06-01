import {
  useGetQuizzemData,
  usePostQuizzemData,
  type UseQuizzemMutation,
  type UseQuizzemQuery,
} from "~/src/api/useQuizzemApi";
import type {
  CreateGameDto,
  CreateGameResponseDto,
  GameDto,
} from "~/src/features/game/api/game.types";

function useCreateGameApi(): UseQuizzemMutation<
  CreateGameDto,
  CreateGameResponseDto
> {
  return usePostQuizzemData<CreateGameDto, CreateGameResponseDto>("/games");
}

function useGetGameListApi(): UseQuizzemQuery<GameDto[]> {
  return useGetQuizzemData<GameDto[]>("/games");
}

export const GameApi = {
  useCreateGameApi,
  useGetGameListApi,
};
