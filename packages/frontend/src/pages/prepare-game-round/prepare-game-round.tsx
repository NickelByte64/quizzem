import { GameRoundActionDto, PageableDto } from "@quizzem/common";
import { Headline, Layout } from "~/components";
import { useGetRemote } from "~/utils";

export function PrepareGameRound() {
  const { data, isLoading } =
    useGetRemote<PageableDto<GameRoundActionDto>>("game-round-action");

  if (isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <Headline as={"h3"}>Fragen bearbeiten</Headline>
      <Headline as={"h3"}>Aktionen bearbeiten</Headline>
      <Headline as={"h3"}>Kategorien bearbeiten</Headline>
    </Layout>
  );
}
