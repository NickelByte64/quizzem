import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { JSX } from "react";
import { UseFieldArrayRemove, useFormContext, useWatch } from "react-hook-form";
import { Input, InputError, LabelInput, Select } from "~/components";
import { CardTitle } from "~/pages/game-create/components/card-title";
import { RenderGameRound } from "~/pages/game-create/components/game-rounds/render-game-round";
import {
  GameRound,
  selectTypeOfRoundOptions,
} from "~/pages/game-create/utils/form-values";

type GameRoundContainerProps = {
  index: number;
  remove: UseFieldArrayRemove;
  fields: any[];
  id: string;
  overlay?: boolean;
};

export function GameRoundContainer(
  props: Readonly<GameRoundContainerProps>
): JSX.Element {
  const { index, remove, fields, id, overlay = false } = props;

  const { register, control, formState } = useFormContext<{
    rounds: GameRound[];
  }>();
  const gameRoundType = useWatch({
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
        <LabelInput label="Art der Runde">
          <Select {...register(`rounds.${index}.type`)}>
            {selectTypeOfRoundOptions.map((option) => (
              <option key={option.type} value={option.type}>
                {option.label}
              </option>
            ))}
          </Select>
        </LabelInput>
        <LabelInput label="Name der Runde">
          <Input
            placeholder="Standardrunde"
            {...register(`rounds.${index}.name`, {
              required: "Der Name der Runde ist erforderlich.",
              minLength: {
                value: 3,
                message:
                  "Der Name der Runde muss mindestens 3 Zeichen lang sein.",
              },
            })}
          />
          <InputError
            message={formState.errors.rounds?.[index]?.name?.message}
          />
        </LabelInput>
        <LabelInput label="Zeit pro Frage (in Sekunden)">
          <Input
            {...register(`rounds.${index}.timeLimit`, {
              valueAsNumber: true,
              required: "Die Zeit pro Frage ist erforderlich.",
              min: {
                value: 1,
                message:
                  "Die Zeit pro Frage muss mindestens 1 Sekunde betragen.",
              },
            })}
          />
          <InputError
            message={formState.errors.rounds?.[index]?.timeLimit?.message}
          />
        </LabelInput>

        <RenderGameRound index={index} gameRound={gameRoundType} />
      </div>
    </div>
  );
}

function getAlternatingBorders(index: number): string {
  const borderClasses = ["border-primary", "border-secondary", "border-accent"];

  return borderClasses[index % borderClasses.length];
}
