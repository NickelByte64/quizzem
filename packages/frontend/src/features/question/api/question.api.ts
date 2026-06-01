import {
  usePostQuizzemData,
  type UseQuizzemMutation,
} from "~/src/api/useQuizzemApi";
import type { CreateQuestionDto } from "~/src/features/question/api/question.types";

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
  useCreateQuestionApi,
  useCreateQuestionsBulkApi,
};
