import type { JSX } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { Button, LabelInput, TextInput } from "~/src/components";
import { QuestionApi } from "~/src/features/question/api/question.api";
import {
  ANSWER_MODE,
  MEDIA_TYPE,
  type AnswerMode,
  type CreateQuestionDto,
  type MediaType,
} from "~/src/features/question/api/question.types";

type QuestionFormValues = {
  text: string;
  answerMode: AnswerMode;
  mediaType: MediaType;
};

type CreateQuestionFormValues = {
  questions: QuestionFormValues[];
};

const DEFAULT_QUESTION: QuestionFormValues = {
  text: "",
  answerMode: ANSWER_MODE.SINGLE_CHOICE,
  mediaType: MEDIA_TYPE.NONE,
};

export function CreateQuestion(): JSX.Element {
  const { control, handleSubmit, reset } = useForm<CreateQuestionFormValues>({
    mode: "onBlur",
    defaultValues: {
      questions: [DEFAULT_QUESTION],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const { useCreateQuestionsBulkApi, useCreateQuestionApi } = QuestionApi;
  const { mutate } = useCreateQuestionApi();
  const { mutate: mutateBulk } = useCreateQuestionsBulkApi();

  const onSubmit: SubmitHandler<CreateQuestionFormValues> = (data) => {
    const formattedData: CreateQuestionDto[] = data.questions.map(
      (question) => ({
        text: question.text,
        answerMode: question.answerMode,
        mediaType: question.mediaType,
        answers: [], // TODO: Add answer creation functionality
      }),
    );

    if (formattedData.length > 1) {
      mutateBulk(formattedData, { onSuccess: () => reset() });
    } else {
      mutate(formattedData[0], { onSuccess: () => reset() });
    }
  };

  return (
    <>
      <h2>Create Question</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <li key={field.id}>
            <Controller
              control={control}
              name={`questions.${index}.text`}
              render={({ field }) => (
                <LabelInput label="Question" htmlFor={field.name}>
                  <TextInput {...field} />
                </LabelInput>
              )}
            />
            <Controller
              control={control}
              name={`questions.${index}.answerMode`}
              render={({ field }) => (
                <LabelInput label="Answer Mode">
                  <select {...field}>
                    {Object.values(ANSWER_MODE).map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </LabelInput>
              )}
            />
            <Controller
              control={control}
              name={`questions.${index}.mediaType`}
              render={({ field }) => (
                <LabelInput label="Media Type">
                  <select {...field}>
                    {Object.values(MEDIA_TYPE).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </LabelInput>
              )}
            />

            <Button onClick={() => remove(index)} disabled={fields.length <= 1}>
              Delete
            </Button>
          </li>
        ))}

        <Button type="button" onClick={() => append(DEFAULT_QUESTION)}>
          Add Question
        </Button>

        <Button type="submit">Create Questions</Button>
      </form>
    </>
  );
}
