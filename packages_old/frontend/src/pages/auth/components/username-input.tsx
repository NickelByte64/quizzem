import { JSX } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "~/components";

type UsernameInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
};

export function UsernameInput<T extends FieldValues>(
  props: Readonly<UsernameInputProps<T>>
): JSX.Element {
  const { register, errors, name } = props;

  return (
    <Input.Label label="User Name" required>
      <Input
        placeholder="Naturwissenschaften"
        required
        errors={errors}
        {...register(name, {
          required: "User name ist erforderlich.",
        })}
      />
      <Input.Error message={errors[name]?.message as string | undefined} />
    </Input.Label>
  );
}
