import { JSX } from "react";
import { useFormContext } from "react-hook-form";
import { Input, InputError, LabelInput } from "~/components";
import { GameSettingsInputProps } from "~/pages/games/components/inputs/game-components-inputs.types";
import { GameRoundFormValues } from "~/pages/games/create-game/utils/game-create.types";

export function NameOfRoundInput(
  props: Readonly<GameSettingsInputProps>
): JSX.Element {
  const { index } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext<GameRoundFormValues>();

  return (
    <LabelInput label="Name der Runde">
      <Input
        errors={errors}
        placeholder="Standardrunde"
        {...register(`rounds.${index}.name`, {
          required: "Der Name der Runde ist erforderlich.",
          minLength: {
            value: 3,
            message: "Der Name der Runde muss mindestens 3 Zeichen lang sein.",
          },
        })}
      />
      <InputError message={errors.rounds?.[index]?.name?.message} />
    </LabelInput>
  );
}
