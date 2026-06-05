import { useId, useState, type JSX } from "react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { Button, ModalDialog } from "~/src/components";
import { QuestionApi } from "~/src/features/question/api/question.api";
import { type CreateQuestionDto } from "~/src/features/question/api/question.types";
import { CreateQuestionListElement } from "~/src/features/question/components/create-questions/create-question-list-element";
import {
  DEFAULT_QUESTION,
  type CreateQuestionFormValues,
} from "~/src/features/question/components/create-questions/form-fields";

export function CreateQuestion(): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const formId = useId();

  const { control, handleSubmit, reset } = useForm<CreateQuestionFormValues>({
    mode: "onChange",
    defaultValues: {
      questions: [DEFAULT_QUESTION],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const { useCreateQuestionsBulkApi } = QuestionApi;
  const { mutate: mutateBulk } = useCreateQuestionsBulkApi();

  const onSubmit: SubmitHandler<CreateQuestionFormValues> = (data) => {
    const formattedData: CreateQuestionDto[] = data.questions.map(
      (question) => ({
        text: question.text,
        answerMode: question.answerMode,
        mediaType: question.mediaType,
        answers: question.answers,
      }),
    );

    mutateBulk(formattedData, {
      onSuccess: () => {
        reset();
        QUERY_CLIENT.invalidateQueries({ queryKey: ["/questions"] });
        setOpenModal(false);
      },
    });
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Create Questions</Button>

      <ModalDialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          reset();
        }}
        title="Create Questions"
        additionalButtons={
          <Button key="submit" type="submit" form={formId}>
            Create Questions
          </Button>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} id={formId}>
          <ul className="flex flex-col">
            {fields.map((field, index) => (
              <CreateQuestionListElement
                key={field.id}
                control={control}
                field={field}
                fields={fields}
                index={index}
                remove={remove}
              />
            ))}
          </ul>

          <Button
            size="full"
            type="button"
            onClick={() => append(DEFAULT_QUESTION)}
          >
            Add Question
          </Button>
        </form>
      </ModalDialog>
    </>
  );
}
