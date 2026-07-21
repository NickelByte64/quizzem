import type { JSX } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useGetQuizzemData, usePutQuizzemData } from "~/src/api/useQuizzemApi";

type CreateGameFormData = {
  title: string;
  description: string | null;
};

export function EditGame(): JSX.Element {
  const { data } = useGetQuizzemData<GameDto[]>("/games");

  return (
    <>
      <h2>Edit Game</h2>

      {data?.data.map((game) => (
        <EditPerGame key={game.id} game={game} />
      ))}

      <button>Edit Game</button>
    </>
  );
}

type EditPerGameProps = {
  game: GameDto;
};

function EditPerGame(props: Readonly<EditPerGameProps>): JSX.Element {
  const { game } = props;

  const { mutate } = usePutQuizzemData<
    { title: string; description: string | null },
    GameDto
  >(`/games/${game.id}`);

  const { handleSubmit, register, formState } = useForm<CreateGameFormData>({
    mode: "onBlur",
    values: { title: game.title, description: game.description },
  });

  const onSubmit: SubmitHandler<CreateGameFormData> = (data) => {
    mutate(data, {
      onSuccess: (data) => console.log(data.data.id),
    });
  };

  return (
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
  );
}
