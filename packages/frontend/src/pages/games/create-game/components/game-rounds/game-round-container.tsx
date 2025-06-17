import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EGameRoundType } from "@quizzem/common";
import clsx from "clsx";
import { JSX } from "react";
import { UseFieldArrayRemove, useFormContext, useWatch } from "react-hook-form";
import { NameOfRoundInput } from "~/pages/games/components/inputs/name-of-round";
import { QuestionCountInput } from "~/pages/games/components/inputs/question-count";
import { TimeLimitInput } from "~/pages/games/components/inputs/time-limit";
import { TypeOfRoundInput } from "~/pages/games/components/inputs/type-of-round";
import { CardTitle } from "~/pages/games/create-game/components/game-rounds/card-title";
import { GameRoundFormValues } from "~/pages/games/create-game/utils/game-create.types";

type GameRoundContainerProps = {
  index: number;
  id: string;
  overlay?: boolean;
  remove: UseFieldArrayRemove;
  fields: GameRoundFormValues["rounds"];
};

export function GameRoundContainer(
  props: Readonly<GameRoundContainerProps>
): JSX.Element {
  const { index, id, overlay = false, remove, fields } = props;

  const { control } = useFormContext<GameRoundFormValues>();

  const gameRoundType: EGameRoundType = useWatch({
    control,
    name: `rounds.${index}.type`,
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        overlay && "opacity-50",
        "rounded-xl shadow-xl w-full bg-base-200 border",
        getAlternatingBorders(index)
      )}
    >
      <CardTitle
        disableRemove={fields.length === 1}
        index={index}
        remove={remove}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
      <div className="p-4 flex flex-col gap-4">
        <TypeOfRoundInput index={index} gameRoundType={gameRoundType} />
        <NameOfRoundInput index={index} gameRoundType={gameRoundType} />
        <TimeLimitInput index={index} gameRoundType={gameRoundType} />
        <QuestionCountInput index={index} gameRoundType={gameRoundType} />
      </div>
    </div>
  );
}

function getAlternatingBorders(index: number): string {
  const borderClasses = ["border-primary", "border-secondary", "border-accent"];
  return borderClasses[index % borderClasses.length];
}
