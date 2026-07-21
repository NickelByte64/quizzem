import type { JSX } from "react/jsx-runtime";
import type { PageableDto } from "~/src/api/api.types";
import type { UseQuizzemQuery } from "~/src/api/useQuizzemApi";
import { RetryAlert } from "~/src/components";
import type { GameDto } from "~/src/features/game/api/game.types";

type ListGamesErrorProps = {
  refetch: UseQuizzemQuery<PageableDto<GameDto>>["refetch"];
};

export function ListGamesError(
  props: Readonly<ListGamesErrorProps>,
): JSX.Element {
  const { refetch } = props;
  return <RetryAlert refetch={refetch} />;
}
