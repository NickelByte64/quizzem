import type { UUID } from "node:crypto";
import type { JSX } from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "~/src/components";

export type CreateGameFormValues = {
  title: string;
  description: string;
  questions: UUID[];
};

export const DEFAULT_GAME: CreateGameFormValues = {
  title: "",
  description: "",
  questions: [],
};

type CreateGameControl = Control<
  CreateGameFormValues,
  any,
  CreateGameFormValues
>;

type TitleInputTextProps = {
  control: CreateGameControl;
};

export function TitleInputText(
  props: Readonly<TitleInputTextProps>,
): JSX.Element {
  const { control } = props;

  const maxLength = 400;

  return (
    <Controller
      control={control}
      name={"title"}
      rules={{
        validate: {
          length: (val) => val.length < maxLength || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root
          error={fieldState.error?.message}
          maxLength={maxLength}
          isRequired
          label="What is the name of the game?"
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

export function DescriptionInputText(
  props: Readonly<TitleInputTextProps>,
): JSX.Element {
  const { control } = props;

  const maxLength = 1000;

  return (
    <Controller
      control={control}
      name={"description"}
      rules={{
        required: false,
        validate: {
          length: (val) => val.length < maxLength || "Length exceeded.",
        },
      }}
      render={({ field, fieldState }) => (
        <Input.Root
          error={fieldState.error?.message}
          maxLength={maxLength}
          label="What is the description of the game?"
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
