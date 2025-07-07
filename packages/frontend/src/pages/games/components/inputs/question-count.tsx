import { EGameRoundType } from "@quizzem/common";
import { JSX, useState } from "react";
import { useFormContext } from "react-hook-form";
import { LabelInput, Range } from "~/components";
import { GameSettingsInputProps } from "~/pages/games/components/inputs/game-components-inputs.types";
import { GameRoundFormValues } from "~/pages/games/create-game/utils/game-create.types";

export function QuestionCountInput(
  props: Readonly<GameSettingsInputProps>
): JSX.Element {
  const { index, gameRoundType } = props;

  const [rangeValue, setRangeValue] = useState(1);

  const { register } = useFormContext<GameRoundFormValues>();

  return (
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
  );
}

function getQuestionTextByGameRoundType(gameRoundType: EGameRoundType): string {
  if (gameRoundType === EGameRoundType.ACTION_ROUND) {
    return "Anzahl der Aktionen";
  } else {
    return "Anzahl der Fragen";
  }
}
