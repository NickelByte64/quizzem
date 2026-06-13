import type { UUID } from "node:crypto";
import { useId, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { Button, ModalDialog } from "~/src/components";
import { QuestionApi } from "~/src/features/question/api/question.api";
import {
  ANSWER_MODE,
  MEDIA_TYPE,
  type UpdateQuestionDto,
} from "~/src/features/question/api/question.types";
import { EditAnswers } from "~/src/features/question/components/edit-question/edit-answers";
import {
  AnswerModeSelect,
  DEFAULT_ANSWER,
  MediaTypeSelect,
  QuestionInputText,
  type UpdateQuestionFormValues,
} from "~/src/features/question/components/edit-question/form-fields";
import { getDirtyValues, isArrayFieldChanged } from "~/src/utils/form-diff";

type EditQuestionFormProps = {
  id: UUID;
};

export function EditQuestionForm(
  props: Readonly<EditQuestionFormProps>,
): JSX.Element | null {
  const { id } = props;

  const formId = useId();
  const navigate = useNavigate();

  const { useUpdateQuestion, useGetQuestionById } = QuestionApi;
  const { data: questionData } = useGetQuestionById(id);
  const { mutate } = useUpdateQuestion(id);

  const { handleSubmit, control, reset, formState } =
    useForm<UpdateQuestionFormValues>({
      mode: "onChange",
      values: {
        text: questionData?.data.text ?? "",
        mediaType: questionData?.data.mediaType ?? MEDIA_TYPE.NONE,
        answerMode: questionData?.data.answerMode ?? ANSWER_MODE.SINGLE_CHOICE,
        answers: questionData?.data.answers ?? [DEFAULT_ANSWER],
      },
    });

  const onSubmit: SubmitHandler<UpdateQuestionFormValues> = (formValues) => {
    const diff = getDirtyValues(formState.dirtyFields, formValues);

    const answersChanged = isArrayFieldChanged(
      diff.answers,
      formValues.answers,
      questionData?.data.answers,
    );

    const formattedData: { id: UUID } & UpdateQuestionDto = {
      id,
      text: diff.text,
      answerMode: diff.answerMode,
      mediaType: diff.mediaType,
      answers: answersChanged
        ? (formValues.answers?.map((answer) => ({
            text: answer.text,
            isCorrectAnswer: answer.isCorrectAnswer,
          })) ?? null)
        : null,
    };
    mutate(formattedData, {
      onSuccess: () => {
        reset();
        QUERY_CLIENT.invalidateQueries({ queryKey: ["/questions"] });
        QUERY_CLIENT.invalidateQueries({ queryKey: [`/questions/${id}`] });
        navigate("/questions");
      },
    });
  };

  return (
    <ModalDialog
      open
      onClose={() => navigate("/questions")}
      title="Edit Question"
      additionalButtons={
        <Button key="submit" type="submit" form={formId}>
          Edit Question
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} id={formId}>
        <QuestionInputText control={control} />
        <AnswerModeSelect control={control} />
        <MediaTypeSelect control={control} />

        <EditAnswers control={control} />
      </form>
    </ModalDialog>
  );
}
