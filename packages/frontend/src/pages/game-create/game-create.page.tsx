import { JSX } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Headline,
  Input,
  InputError,
  LabelInput,
  Layout,
} from "~/components";
import { GameRounds } from "~/pages/game-create/components/game-rounds/game-rounds";
import { defaultGame } from "~/pages/game-create/utils/form-values";
import { GameRoundFormValues } from "~/pages/game-create/utils/game-create.types";

export function GameCreatePage(): JSX.Element {
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
    console.log(data); // TODO send to backend
  };

  return (
    <Layout>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Headline>Spiel erstellen</Headline>

          <div className="flex flex-col mb-4 gap-2">
            <Button className="w-fit">Spiel erstellen</Button>
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
        </form>
      </FormProvider>
    </Layout>
  );
}
