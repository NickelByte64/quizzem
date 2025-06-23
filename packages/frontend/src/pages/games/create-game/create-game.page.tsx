import { CreateGameDto } from "@quizzem/common";
import { UUID } from "crypto";
import { JSX } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  Button,
  Headline,
  Input,
  InputError,
  LabelInput,
  Layout,
} from "~/components";
import { GameRounds } from "~/pages/games/create-game/components/game-rounds/game-rounds";
import { defaultGame } from "~/pages/games/create-game/utils/form-values";
import { GameRoundFormValues } from "~/pages/games/create-game/utils/game-create.types";
import { usePostRemote } from "~/utils";

export function CreateGamePage(): JSX.Element {
  const navigate = useNavigate();
  const { mutate } = usePostRemote<CreateGameDto, UUID>("game");
  const form = useForm<GameRoundFormValues>({
    mode: "onBlur",
    defaultValues: defaultGame,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<GameRoundFormValues> = (data) => {
    mutate(data, {
      onSuccess(data) {
        navigate(`/game-manager/${data}`);
      },
      onError(error) {
        // TODO
        console.error("Error creating game:", error);
      },
    });
  };

  return (
    <Layout>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Headline>Spiel erstellen</Headline>

          <div className="flex flex-col mb-4 gap-4">
            <p className="text-sm">
              Mit Klick auf Spiel erstellen legst du das Spiel fest. Alles
              Weitere wie Kategorien, Fragen, etc. kannst du dann im Game
              Manager anpassen.
            </p>
          </div>

          <div className={"mb-8"}>
            <LabelInput label="Name des Spiels">
              <Input
                errors={errors}
                placeholder="Wer wird Billionär?"
                {...register("name", {
                  required: "Der Name des Spiels ist erforderlich.",
                })}
              />
              <InputError message={errors.name?.message} />
            </LabelInput>
          </div>

          <GameRounds />

          <Button className="w-full mt-4">Spiel erstellen</Button>
        </form>
      </FormProvider>
    </Layout>
  );
}
