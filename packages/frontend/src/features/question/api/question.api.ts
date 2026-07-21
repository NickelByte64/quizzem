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

  const url = `${ROOT_QUESTIONS_TARGET}?${searchParams.toString()}`;
  return useGetQuizzemData<PageableDto<QuestionDto>>(url);
}

function useGetQuestionById(id: UUID): UseQuizzemQuery<QuestionDto> {
  const url = `${ROOT_QUESTIONS_TARGET}/${id}`;
  return useGetQuizzemData<QuestionDto>(url);
}

function useCreateQuestion(): UseQuizzemMutation<CreateQuestionDto, void> {
  return usePostQuizzemData<CreateQuestionDto, void>(ROOT_QUESTIONS_TARGET);
}

function useCreateQuestionsBulk(): UseQuizzemMutation<
  CreateQuestionDto[],
  void
> {
  const url = `${ROOT_QUESTIONS_TARGET}/bulk`;
  return usePostQuizzemData<CreateQuestionDto[], void>(url);
}

function useUpdateQuestion(
  id: UUID,
): UseQuizzemMutation<UpdateQuestionDto, void> {
  const url = `${ROOT_QUESTIONS_TARGET}/${id}`;
  return usePatchQuizzemData<UpdateQuestionDto, void>(url);
}

function useDeleteQuestion(id: UUID): UseQuizzemMutation<void, void> {
  const url = `${ROOT_QUESTIONS_TARGET}/${id}`;
  return useDeleteQuizzemData<void>(url);
}

export const QuestionApi = {
  useGetQuestionList,
  useGetQuestionById,
  useCreateQuestion,
  useCreateQuestionsBulk,
  useUpdateQuestion,
  useDeleteQuestion,
};
