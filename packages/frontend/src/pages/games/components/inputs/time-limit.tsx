import { EGameRoundType } from "@quizzem/common";
import { JSX } from "react";
import { useFormContext } from "react-hook-form";
import { Input, InputError, LabelInput } from "~/components";
import { GameSettingsInputProps } from "~/pages/games/components/inputs/game-components-inputs.types";
import { GameRoundFormValues } from "~/pages/games/create-game/utils/game-create.types";

export function TimeLimitInput(
  props: Readonly<GameSettingsInputProps>
): JSX.Element {
  const { index, gameRoundType } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext<GameRoundFormValues>();

  return (
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
  );
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
