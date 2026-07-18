import type { UUID } from "node:crypto";
import { useId, useState, type JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { Button, Dialog, Form, Stack } from "~/src/components";
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
import { FormService } from "~/src/utils/form.service";

type EditQuestionProps = {
  id: UUID;
};

export function EditQuestion(
  props: Readonly<EditQuestionProps>,
): JSX.Element | null {
  const { id } = props;

  const [openDialog, setOpenDialog] = useState<boolean>(!!id);

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
    const diff = FormService.getDirtyValues(formState.dirtyFields, formValues);

    const answersChanged = FormService.isArrayFieldChanged(
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
    <Dialog.Root
      onClose={() => {
        setOpenDialog(false);
        reset();
        navigate("/questions");
      }}
      open={openDialog}
      label="Edit Question"
      width="md"
    >
      <Dialog>
        <Dialog.Title />
        <Dialog.Content>
          <Form onSubmit={handleSubmit(onSubmit)} id={formId}>
            <Stack sx={{ flexDirection: "column", gap: 2 }}>
              <QuestionInputText control={control} />
              <AnswerModeSelect control={control} />
              <MediaTypeSelect control={control} />
              <EditAnswers control={control} />
            </Stack>
          </Form>
        </Dialog.Content>
        <Dialog.Actions>
          <Button type="submit" form={formId}>
            Edit Question
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Dialog.Root>
  );
}
