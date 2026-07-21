import { useId, useState, type JSX } from "react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { QUERY_CLIENT } from "~/src/api/query-client";
import {
  Box,
  Button,
  CreateButton,
  Dialog,
  Form,
  List,
} from "~/src/components";
import {
  QuestionApi,
  ROOT_QUESTIONS_TARGET,
} from "~/src/features/question/api/question.api";
import { type CreateQuestionDto } from "~/src/features/question/api/question.types";
import { CreateQuestionListElement } from "~/src/features/question/components/create-questions/create-question-list-element";
import {
  DEFAULT_QUESTION,
  type CreateQuestionFormValues,
} from "~/src/features/question/components/create-questions/form-fields";

export function CreateQuestion(): JSX.Element {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
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

  const { useCreateQuestionsBulk } = QuestionApi;
  const { mutate: mutateBulk } = useCreateQuestionsBulk();

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
        QUERY_CLIENT.invalidateQueries({ queryKey: [ROOT_QUESTIONS_TARGET] });
        setOpenDialog(false);
      },
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <CreateButton onClick={() => setOpenDialog(true)}>
        Create Questions
      </CreateButton>

      <Dialog.Root
        onClose={() => {
          setOpenDialog(false);
          reset();
        }}
        open={openDialog}
        label="Create Questions"
        width="md"
      >
        <Dialog>
          <Dialog.Title />
          <Dialog.Content>
            <Form id={formId} onSubmit={handleSubmit(onSubmit)}>
              <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {fields.map((field, i) => (
                  <CreateQuestionListElement
                    key={field.id}
                    control={control}
                    field={field}
                    fields={fields}
                    index={i}
                    remove={remove}
                  />
                ))}
              </List>

              <Button
                fullWidth
                type="button"
                sx={{ mt: 2 }}
                onClick={() => append(DEFAULT_QUESTION)}
              >
                Add Question
              </Button>
            </Form>
          </Dialog.Content>
          <Dialog.Actions>
            <Button type="submit" form={formId}>
              Create Questions
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Dialog.Root>
    </Box>
  );
}
