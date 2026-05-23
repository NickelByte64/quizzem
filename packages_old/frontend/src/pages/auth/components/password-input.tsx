import { JSX } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "~/components";

type PasswordInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
};

export function PasswordInput<T extends FieldValues>(
  props: Readonly<PasswordInputProps<T>>
): JSX.Element {
  const { register, errors, name } = props;

  return (
    <Input.Label label="Passwort" required>
      <Input
        placeholder="Naturwissenschaften"
        required
        type="password"
        errors={errors}
        {...register(name, {
          required: "Passwort ist erforderlich.",
          minLength: {
            value: 6,
            message: "Passwort muss mindestens 6 Zeichen lang sein",
          },
        })}
      />
      <Input.Error message={errors[name]?.message as string | undefined} />
    </Input.Label>
  );
}
