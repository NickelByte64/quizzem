import { SignUpDto } from "@quizzem/common";
import { AxiosError } from "axios";
import { JSX, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Button, Headline } from "~/components";
import { AuthAlert } from "~/pages/auth/components/auth-alert";
import { PasswordInput } from "~/pages/auth/components/password-input";
import { UsernameInput } from "~/pages/auth/components/username-input";
import { invalidateAuth, usePostRemote } from "~/utils";
import { ErrorService } from "~/utils/error/error.service";

export function SignUpPage(): JSX.Element {
  const [remoteError, setRemoteError] = useState<AxiosError | null>(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDto>({
    mode: "onBlur",
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const { mutate } = usePostRemote<SignUpDto, void>("auth/sign-up");

  const onSubmit: SubmitHandler<SignUpDto> = (data) => {
    mutate(data, {
      onSuccess: () => {
        invalidateAuth();
        navigate("/");
      },
      onError: (error) => {
        setRemoteError(error);
        ErrorService.resetError(setRemoteError);
      },
    });
  };

  return (
    <>
      <Headline as="h1">Anmelden</Headline>

      <AuthAlert remoteError={remoteError} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <UsernameInput register={register} errors={errors} name="userName" />
        <PasswordInput register={register} errors={errors} name="password" />

        <Button type={"submit"} disabled={Object.keys(errors).length > 0}>
          Anmelden
        </Button>
      </form>

      <Button variant="secondary" className="w-full mt-4">
        <Link to={"/auth/sign-in"}>Hast du ein Account? Hier einloggen</Link>
      </Button>
    </>
  );
}
