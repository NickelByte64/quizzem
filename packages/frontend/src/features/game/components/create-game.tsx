import type { JSX } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
// import { Button, LabelInput, TextInput } from "~/src/components";
import { GameApi } from "~/src/features/game/api/game.api";

type CreateGameFormValues = {
  title: string;
  description: string;
};

export function CreateGame(): JSX.Element {
  const { control, handleSubmit } = useForm<CreateGameFormValues>({
    mode: "onBlur",
    defaultValues: { title: "", description: "" },
  });
  const navigate = useNavigate();

  const { useCreateGameApi } = GameApi;
  const { mutate } = useCreateGameApi();

  const onSubmit: SubmitHandler<CreateGameFormValues> = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        navigate(`/games/${res.data.id}`);
      },
    });
  };

  return (
    <>
      <h2>Create Game</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <></>
            // <LabelInput label="Title" htmlFor={field.name}>
            //   <TextInput {...field} />
            // </LabelInput>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <></>
            // <LabelInput label="Description" htmlFor={field.name}>
            //   <TextInput {...field} />
            // </LabelInput>
          )}
        />

        <Button type="submit">Create Game</Button>
      </form>
    </>
  );
}
