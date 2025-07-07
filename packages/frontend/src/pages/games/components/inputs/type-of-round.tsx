import { JSX } from "react";
import { useFormContext } from "react-hook-form";
import { LabelInput, Select } from "~/components";
import { GameSettingsInputProps } from "~/pages/games/components/inputs/game-components-inputs.types";
import { SELECT_TYPE_OF_ROUND_OPTIONS } from "~/pages/games/create-game/utils/form-values";
import { GameRoundFormValues } from "~/pages/games/create-game/utils/game-create.types";

export function TypeOfRoundInput(
  props: Readonly<GameSettingsInputProps>
): JSX.Element {
  const { index } = props;

  const { register } = useFormContext<GameRoundFormValues>();

  return (
    <LabelInput label="Art der Runde">
      <Select {...register(`rounds.${index}.type`)}>
        {SELECT_TYPE_OF_ROUND_OPTIONS.map((option) => (
          <option key={option.type} value={option.type}>
            {option.label}
          </option>
        ))}
      </Select>
    </LabelInput>
  );
}
