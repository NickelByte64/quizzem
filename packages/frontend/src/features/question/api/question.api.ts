import {
  useGetQuizzemData,
  usePostQuizzemData,
  type UseQuizzemMutation,
  type UseQuizzemQuery,
} from "~/src/api/useQuizzemApi";
import type {
  CreateQuestionDto,
  QuestionDto,
} from "~/src/features/question/api/question.types";

function useGetQuestionListApi(): UseQuizzemQuery<QuestionDto[]> {
  return useGetQuizzemData<QuestionDto[]>("/questions");
}

function useCreateQuestionApi(): UseQuizzemMutation<CreateQuestionDto, void> {
  return usePostQuizzemData<CreateQuestionDto, void>("/questions");
}

function useCreateQuestionsBulkApi(): UseQuizzemMutation<
  CreateQuestionDto[],
  void
> {
  return usePostQuizzemData<CreateQuestionDto[], void>("/questions/bulk");
}

export const QuestionApi = {
  useGetQuestionListApi,
  useCreateQuestionApi,
  useCreateQuestionsBulkApi,
};
