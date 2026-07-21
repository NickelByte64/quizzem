import type { UUID } from "node:crypto";
import type { JSX } from "react";
import { Controller, type Control } from "react-hook-form";
import type { PageableDto } from "~/src/api/api.types";
import type { HttpResponse } from "~/src/api/http";
import { Checkbox, Input, List } from "~/src/components";
import type { QuestionDto } from "~/src/features/question/api/question.types";

export type UpdateGameFormValues = {
  title: string;
  description: string;
  questions: UUID[];
};

type GameInputTextProps = {
  control: Control<UpdateGameFormValues, any, UpdateGameFormValues>;
};

export function GameInputTitle(
  props: Readonly<GameInputTextProps>,
): JSX.Element {
  const { control } = props;

  const maxLength = 1000;

  return (
    <Controller
      control={control}
      name={"title"}
      rules={{
        validate: {
          length: (val) =>
            (val?.length && val.length < maxLength) || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root
          label="What is the game's name?"
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

type GameInputDescriptionProps = {
  control: Control<UpdateGameFormValues, any, UpdateGameFormValues>;
};

export function GameInputDescription(
  props: Readonly<GameInputDescriptionProps>,
): JSX.Element {
  const { control } = props;

  const maxLength = 1000;

  return (
    <Controller
      control={control}
      name={"description"}
      rules={{
        validate: {
          length: (val) =>
            (val?.length && val.length < maxLength) || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root
          label="What is the game's description?"
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

type GameInputQuestionsProps = {
  control: Control<UpdateGameFormValues, any, UpdateGameFormValues>;
  questionData: HttpResponse<PageableDto<QuestionDto>> | undefined;
};

export function GameInputQuestions(
  props: Readonly<GameInputQuestionsProps>,
): JSX.Element {
  const { control, questionData } = props;

  const maxLength = 1000;

  return (
    <Controller
      control={control}
      name={"questions"}
      rules={{
        validate: {
          length: (val) =>
            (val?.length && val.length < maxLength) || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <List>
          {questionData?.data.data.map((question) => (
            <List.Item key={question.id}>
              <Checkbox.Root
                field={field}
                label={question.text}
                value={question.id}
              >
                <Checkbox />
              </Checkbox.Root>
            </List.Item>
          ))}
        </List>
      )}
    />
  );
}
