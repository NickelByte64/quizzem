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
  CreateQuestionDto,
  GetAllQuestionsParamsDto,
  QuestionDto,
  UpdateQuestionDto,
} from "~/src/features/question/api/question.types";

export const ROOT_QUESTIONS_TARGET = "/questions";

function useGetQuestionList(
  params: GetAllQuestionsParamsDto,
): UseQuizzemQuery<PageableDto<QuestionDto>> {
  const searchParams = new URLSearchParams({
    page: String(params?.page ?? 0),
    size: String(params?.size ?? 20),
  });

  return useGetQuizzemData<PageableDto<QuestionDto>>(
    `${ROOT_QUESTIONS_TARGET}?${searchParams.toString()}`,
  );
}

function useGetQuestionById(id: UUID): UseQuizzemQuery<QuestionDto> {
  return useGetQuizzemData<QuestionDto>(`${ROOT_QUESTIONS_TARGET}/${id}`);
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

function useUpdateQuestion(
  id: UUID,
): UseQuizzemMutation<UpdateQuestionDto, void> {
  return usePatchQuizzemData<UpdateQuestionDto, void>(
    `${ROOT_QUESTIONS_TARGET}/${id}`,
  );
}

function useDeleteQuestion(id: UUID): UseQuizzemMutation<void, void> {
  return useDeleteQuizzemData<void>(`${ROOT_QUESTIONS_TARGET}/${id}`);
}

export const QuestionApi = {
  useGetQuestionList,
  useGetQuestionById,
  useCreateQuestion,
  useCreateQuestionsBulk,
  useUpdateQuestion,
  useDeleteQuestion,
};
