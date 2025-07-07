import { GameDto } from "@quizzem/common";
import { UUID } from "crypto";
import { JSX } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Headline, Layout } from "~/components";
import { ManageGameRounds } from "~/pages/games/game-manager/components/manage-game-rounds";
import { useGetRemote } from "~/utils";

export function GameManagerPage(): JSX.Element {
  const { id } = useParams<{ id: UUID }>();

  const { data } = useGetRemote<GameDto>(`game/${id}`);
  const form = useForm({
    mode: "onBlur",
    values: data,
  });

  const { handleSubmit } = form;

  // TODO
  if (!data) {
    return <div>No data</div>;
  }

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
  };

  return (
    <Layout>
      <Headline>Game Manager für "{data.name}"</Headline>
      <p>Hier kannst du den Spielverlauf verwalten.</p>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ManageGameRounds data={data} />
        </form>
      </FormProvider>
    </Layout>
  );
}
