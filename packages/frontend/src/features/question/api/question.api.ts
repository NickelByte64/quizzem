import type { UUID } from "node:crypto";
import type { PageableDto } from "~/src/api/api.types";
import {
  useDeleteQuizzemData,
  useGetQuizzemData,
  usePostQuizzemData,
  type UseQuizzemMutation,
  type UseQuizzemQuery,
} from "~/src/api/useQuizzemApi";
import type {
  CreateQuestionDto,
  GetAllQuestionsParamsDto,
  QuestionDto,
} from "~/src/features/question/api/question.types";

export const ROOT_QUESTIONS_TARGET = "/questions";

function useGetQuestionList(
  params: GetAllQuestionsParamsDto,
): UseQuizzemQuery<PageableDto<QuestionDto>> {
  const searchParams = new URLSearchParams({
    page: String(params?.page ?? 0),
    size: String(params?.size ?? 10),
  });

  return useGetQuizzemData<PageableDto<QuestionDto>>(
    `${ROOT_QUESTIONS_TARGET}?${searchParams.toString()}`,
  );
}

function useCreateQuestion(): UseQuizzemMutation<CreateQuestionDto, void> {
  return usePostQuizzemData<CreateQuestionDto, void>(ROOT_QUESTIONS_TARGET);
}

function useCreateQuestionsBulk(): UseQuizzemMutation<
  CreateQuestionDto[],
  void
> {
  return usePostQuizzemData<CreateQuestionDto[], void>(
    `${ROOT_QUESTIONS_TARGET}/bulk`,
  );
}

function useDeleteQuestionsById(): UseQuizzemMutation<{ id: UUID }, void> {
  return useDeleteQuizzemData<{ id: UUID }, void>(ROOT_QUESTIONS_TARGET);
}

export const QuestionApi = {
  useGetQuestionList,
  useCreateQuestion,
  useCreateQuestionsBulk,
  useDeleteQuestionsById,
};
