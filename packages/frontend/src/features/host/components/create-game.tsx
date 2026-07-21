import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { usePostQuizzemData } from "~/src/api/useQuizzemApi";

type CreateGameFormData = {
  title: string;
  description: string | null;
};

export function CreateGame(): JSX.Element {
  const { handleSubmit, register, formState } = useForm<CreateGameFormData>({
    mode: "onBlur",
    defaultValues: { title: "", description: null },
  });

  const { mutate } = usePostQuizzemData<
    { title: string; description: string | null },
    { id: string }
  >("/games");

  const onSubmit: SubmitHandler<CreateGameFormData> = (data) => {
    mutate(data, {
      onSuccess: (data) => console.log(data.data.id),
    });
  };

  console.log(formState.errors);

  return (
    <>
      <h2>Create Game</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Game Name"
          {...register("title", { maxLength: 256, required: true })}
        />
        <input
          type="text"
          placeholder="Game description"
          {...register("description", { maxLength: 512 })}
        />
        <button type="submit">Create Game</button>
      </form>
    </>
  );
}
