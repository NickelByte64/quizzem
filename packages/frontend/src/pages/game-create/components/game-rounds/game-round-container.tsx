import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { JSX, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Input, InputError, LabelInput, Range, Select } from "~/components";
import { CardTitle } from "~/pages/game-create/components/game-rounds/card-title";
import { selectTypeOfRoundOptions } from "~/pages/game-create/utils/form-values";
import {
  EGameRoundType,
  GameRoundFormValues,
} from "~/pages/game-create/utils/game-create.types";

type GameRoundContainerProps = {
  index: number;
  id: string;
  overlay?: boolean;
};

export function GameRoundContainer(
  props: Readonly<GameRoundContainerProps>
): JSX.Element {
  const { index, id, overlay = false } = props;

  const [rangeValue, setRangeValue] = useState(1);

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<GameRoundFormValues>();

  const { remove, fields } = useFieldArray({
    name: "rounds",
    control,
  });

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
            errors={errors}
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
          <InputError message={errors.rounds?.[index]?.name?.message} />
        </LabelInput>

        <LabelInput label={getTimeLimitTextByGameRoundType(gameRoundType)}>
          <Input
            errors={errors}
            type="number"
            {...register(`rounds.${index}.timeLimit`, {
              valueAsNumber: true,
              required: "Die Zeit pro Frage ist erforderlich.",
              min: configureTimeLimitValueByGameRoundType(gameRoundType),
            })}
          />
          <InputError message={errors.rounds?.[index]?.timeLimit?.message} />
        </LabelInput>

        <LabelInput label={getQuestionTextByGameRoundType(gameRoundType)}>
          <Range
            min={1}
            max={10}
            step={1}
            value={rangeValue}
            {...register(`rounds.${index}.count`, {
              valueAsNumber: true,
              onChange(event) {
                setRangeValue(Number(event.target.value));
              },
            })}
          />
        </LabelInput>
      </div>
    </div>
  );
}

function getAlternatingBorders(index: number): string {
  const borderClasses = ["border-primary", "border-secondary", "border-accent"];
  return borderClasses[index % borderClasses.length];
}

function configureTimeLimitValueByGameRoundType(
  gameRoundType: EGameRoundType
): {
  value: number;
  message: string;
} {
  if (gameRoundType === EGameRoundType.ACTION_ROUND) {
    return {
      value: 0,
      message: "Die Zeit pro Aktion muss mindestens 0 sein.",
    };
  } else {
    return {
      value: 1,
      message: "Die Zeit pro Frage muss mindestens 1 Sekunde betragen.",
    };
  }
}

function getTimeLimitTextByGameRoundType(
  gameRoundType: EGameRoundType
): string {
  if (gameRoundType === EGameRoundType.ACTION_ROUND) {
    return "Zeit pro Aktion (in Sekunden; wenn 0, dann unbegrenzt)";
  } else {
    return "Zeit pro Frage (in Sekunden)";
  }
}

function getQuestionTextByGameRoundType(gameRoundType: EGameRoundType): string {
  if (gameRoundType === EGameRoundType.ACTION_ROUND) {
    return "Anzahl der Aktionen";
  } else {
    return "Anzahl der Fragen";
  }
}
