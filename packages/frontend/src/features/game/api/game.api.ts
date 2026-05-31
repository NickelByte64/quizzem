import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import type { HttpResponse } from "~/src/api/http";
import { useGetQuizzemData, usePostQuizzemData } from "~/src/api/useQuizzemApi";
import type {
  CreateGameDto,
  CreateGameResponseDto,
  GameDto,
} from "~/src/features/game/api/game.types";

function useCreateGameApi(): UseMutationResult<
  HttpResponse<CreateGameResponseDto>,
  Error,
  CreateGameDto
> {
  return usePostQuizzemData<CreateGameDto, CreateGameResponseDto>("/games");
}

function useGetGameListApi(): UseQueryResult<HttpResponse<GameDto[]>> {
  return useGetQuizzemData<GameDto[]>("/games");
}

export const GameApi = {
  useCreateGameApi,
  useGetGameListApi,
};
