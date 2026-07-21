import type { UUID } from "node:crypto";
import { type JSX } from "react";
import { useParams } from "react-router";
import { Layout, type BreadcrumbsType } from "~/src/components";
import { CreateGame } from "~/src/features/game/components/create-game";
import { EditGame } from "~/src/features/game/components/edit-game/edit-game";
import { ListGames } from "~/src/features/game/components/list-games/list-games";

const breadcrumbs: BreadcrumbsType[] = [
  { name: "Home", to: "/" },
  { name: "Games", to: undefined },
];

export function GamePage(): JSX.Element {
  const { id } = useParams<{ id: UUID }>();

  return (
    <Layout title={"Game Page"} breadcrumbs={breadcrumbs}>
      <CreateGame />
      {id && <EditGame id={id} />}
      <ListGames />
    </Layout>
  );
}
