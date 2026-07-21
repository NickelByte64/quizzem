import type { JSX } from "react";
import { Controller, useWatch, type Control } from "react-hook-form";
import { Checkbox, Input, Select, type SelectOptions } from "~/src/components";
import {
  ANSWER_MODE,
  MEDIA_TYPE,
  type AnswerMode,
  type MediaType,
} from "~/src/features/question/api/question.types";

export type UpdateAnswerFormValues = {
  text: string;
  isCorrectAnswer: boolean;
};

export type UpdateQuestionFormValues = {
  text: string;
  answerMode: AnswerMode;
  mediaType: MediaType;
  answers: UpdateAnswerFormValues[];
};

export const DEFAULT_ANSWER = {
  text: "",
  isCorrectAnswer: false,
};

type QuestionInputTextProps = {
  control: Control<UpdateQuestionFormValues, any, UpdateQuestionFormValues>;
};

export function QuestionInputText(
  props: Readonly<QuestionInputTextProps>,
): JSX.Element {
  const { control } = props;

  const maxLength = 1000;

  return (
    <Controller
      control={control}
      name={`text`}
      rules={{
        validate: {
          length: (val) =>
            (val?.length && val.length < maxLength) || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root
          label="What is the question?"
          error={fieldState.error?.message}
          maxLength={maxLength}
          field={field}
        >
          <Input.Label>
            <Input />
          </Input.Label>
        </Input.Root>
      )}
    />
  );
}

const ANSWER_MODE_OPTIONS: SelectOptions<AnswerMode>[] = [
  { value: ANSWER_MODE.FREE_TEXT, label: "Free Text" },
  { value: ANSWER_MODE.MULTIPLE_CHOICE, label: "Multiple Choice" },
  { value: ANSWER_MODE.SINGLE_CHOICE, label: "Single Choice" },
  { value: ANSWER_MODE.NUMERIC, label: "Numeric" },
  { value: ANSWER_MODE.ORDERING, label: "Ordering" },
  { value: ANSWER_MODE.TRUE_FALSE, label: "True/False" },
];

export function AnswerModeSelect(
  props: Readonly<QuestionInputTextProps>,
): JSX.Element {
  const { control } = props;

  return (
    <Controller
      control={control}
      name={`answerMode`}
      render={({ field, fieldState }) => (
        <Select.Root
          label="Answer Mode"
          options={ANSWER_MODE_OPTIONS}
          field={field}
          error={fieldState.error?.message}
        >
          <Select.Label />
          <Select />
        </Select.Root>
      )}
    />
  );
}

const MEDIA_TYPE_OPTIONS: SelectOptions<MediaType>[] = [
  { value: MEDIA_TYPE.NONE, label: "None" },
  { value: MEDIA_TYPE.AUDIO, label: "Audio" },
  { value: MEDIA_TYPE.VIDEO, label: "Video" },
  { value: MEDIA_TYPE.IMAGE, label: "Image" },
];

export function MediaTypeSelect(
  props: Readonly<QuestionInputTextProps>,
): JSX.Element {
  const { control } = props;

  return (
    <Controller
      control={control}
      name={`mediaType`}
      render={({ field, fieldState }) => (
        <Select.Root
          label="Media Type"
          options={MEDIA_TYPE_OPTIONS}
          field={field}
          error={fieldState.error?.message}
        >
          <Select.Label />
          <Select />
        </Select.Root>
      )}
    />
  );
}

type AnswerInputTextProps = {
  control: Control<UpdateQuestionFormValues, any, UpdateQuestionFormValues>;
  index: number;
};

export function AnswerInputText(
  props: Readonly<AnswerInputTextProps>,
): JSX.Element {
  const { control, index } = props;

  const maxLength = 500;

  return (
    <Controller
      control={control}
      name={`answers.${index}.text`}
      rules={{
        validate: {
          length: (val) => val.trim().length < maxLength || "Length exceeded.",
          required: (val) => val.length > 0 || "Field is required.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root
          label="What is the answer?"
          error={fieldState.error?.message}
          maxLength={maxLength}
          isRequired
          field={field}
        >
          <Input.Label>
            <Input />
          </Input.Label>
        </Input.Root>
      )}
    />
  );
}

type AnswerInputIsCorrectAnswerProps = {
  control: Control<UpdateQuestionFormValues, any, UpdateQuestionFormValues>;
  index: number;
};

export function AnswerInputIsCorrectAnswer(
  props: Readonly<AnswerInputIsCorrectAnswerProps>,
): JSX.Element {
  const { control, index } = props;

  const answers = useWatch({ control, name: `answers` });

  const isDisabled = answers?.some((a, i) => i !== index && a.isCorrectAnswer);

  return (
    <Controller
      control={control}
      name={`answers.${index}.isCorrectAnswer`}
      render={({ field }) => (
        <Checkbox.Root
          field={field}
          isDisabled={isDisabled}
          label="Is this the correct answer?"
        >
          <Checkbox />
        </Checkbox.Root>
      )}
    />
  );
}
