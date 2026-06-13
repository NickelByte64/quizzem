import type { JSX } from "react";
import { Controller, useWatch, type Control } from "react-hook-form";
import { Checkbox, Input, Select, type SelectOptions } from "~/src/components";
import {
  ANSWER_MODE,
  MEDIA_TYPE,
  type AnswerMode,
  type MediaType,
} from "~/src/features/question/api/question.types";

export type AnswerFormValues = {
  text: string;
  isCorrectAnswer: boolean;
};

export type QuestionFormValues = {
  text: string;
  answerMode: AnswerMode;
  mediaType: MediaType;
  answers: AnswerFormValues[];
};

export type CreateQuestionFormValues = {
  questions: QuestionFormValues[];
};

export const DEFAULT_ANSWER = {
  text: "",
  isCorrectAnswer: false,
};

export const DEFAULT_QUESTION: QuestionFormValues = {
  text: "",
  answerMode: ANSWER_MODE.SINGLE_CHOICE,
  mediaType: MEDIA_TYPE.NONE,
  answers: [DEFAULT_ANSWER],
};

type QuestionInputTextProps = {
  control: Control<CreateQuestionFormValues, any, CreateQuestionFormValues>;
  index: number;
};

export function QuestionInputText(
  props: Readonly<QuestionInputTextProps>,
): JSX.Element {
  const { control, index } = props;

  const maxLength = 1000;

  return (
    <Controller
      control={control}
      name={`questions.${index}.text`}
      rules={{
        validate: {
          length: (val) => val.length < maxLength || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root error={fieldState.error?.message} maxLength={maxLength}>
          <Input.Label label="What is the question?">
            <Input {...field} />
          </Input.Label>
          <Input.Optionals>
            <Input.Error />
            <Input.Length value={field.value} />
          </Input.Optionals>
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
  const { control, index } = props;

  return (
    <Controller
      control={control}
      name={`questions.${index}.answerMode`}
      render={({ field }) => (
        <Select.Root>
          <Select.Label label="Answer Mode" />
          <Select options={ANSWER_MODE_OPTIONS} {...field} />
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
  const { control, index } = props;

  return (
    <Controller
      control={control}
      name={`questions.${index}.mediaType`}
      render={({ field }) => (
        <Select.Root>
          <Select.Label label="Media Type" />
          <Select options={MEDIA_TYPE_OPTIONS} {...field} />
          <Select.Optionals>
            <Select.Error />
          </Select.Optionals>
        </Select.Root>
      )}
    />
  );
}

type AnswerInputTextProps = {
  control: Control<CreateQuestionFormValues, any, CreateQuestionFormValues>;
  questionIndex: number;
  answerIndex: number;
};

export function AnswerInputText(
  props: Readonly<AnswerInputTextProps>,
): JSX.Element {
  const { control, questionIndex, answerIndex } = props;

  const maxLength = 500;

  return (
    <Controller
      control={control}
      name={`questions.${questionIndex}.answers.${answerIndex}.text`}
      rules={{
        validate: {
          length: (val) => val.length < maxLength || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root error={fieldState.error?.message} maxLength={maxLength}>
          <Input.Label label="What is the answer?">
            <Input {...field} />
          </Input.Label>
          <Input.Optionals>
            <Input.Error />
            <Input.Length value={field.value} />
          </Input.Optionals>
        </Input.Root>
      )}
    />
  );
}

type AnswerInputIsCorrectAnswerProps = {
  control: Control<CreateQuestionFormValues, any, CreateQuestionFormValues>;
  questionIndex: number;
  answerIndex: number;
};

export function AnswerInputIsCorrectAnswer(
  props: Readonly<AnswerInputIsCorrectAnswerProps>,
): JSX.Element {
  const { control, questionIndex, answerIndex } = props;

  const answers = useWatch({
    control,
    name: `questions.${questionIndex}.answers`,
  });

  const isDisabled = answers.some(
    (answer, index) => index !== answerIndex && answer.isCorrectAnswer,
  );

  return (
    <Controller
      control={control}
      name={`questions.${questionIndex}.answers.${answerIndex}.isCorrectAnswer`}
      render={({ field }) => (
        <Checkbox.Label
          disabled={isDisabled}
          label="Is this the correct answer?"
        >
          <Checkbox {...field} disabled={isDisabled} />
        </Checkbox.Label>
      )}
    />
  );
}
