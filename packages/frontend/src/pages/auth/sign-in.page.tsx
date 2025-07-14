import { SignInDto } from "@quizzem/common";
import { AxiosError } from "axios";
import { JSX, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Alert, Button, Headline, Input, Layout } from "~/components";
import { usePostRemote } from "~/utils";

export function SignInPage(): JSX.Element {
  const [remoteError, setRemoteError] = useState<AxiosError | null>(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDto>({
    mode: "onBlur",
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const resetError = () => setTimeout(() => setRemoteError(null), 5000);

  const { mutate } = usePostRemote<SignInDto, void>("auth/sign-in");

  const onSubmit: SubmitHandler<SignInDto> = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        setRemoteError(error);
        resetError();
      },
    });
  };

  return (
    <Layout>
      <Headline as="h1">Anmelden</Headline>

      <Alert show={!!remoteError} variant={"error"} className="mb-4">
        {remoteError?.response?.data?.message}
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input.Label label="User Name" required>
          <Input
            placeholder="Naturwissenschaften"
            required
            errors={errors}
            {...register(`userName`, {
              required: "User name ist erforderlich.",
            })}
          />
          <Input.Error message={errors.userName?.message} />
        </Input.Label>
        <Input.Label label="Passwort" required>
          <Input
            placeholder="Naturwissenschaften"
            required
            type="password"
            errors={errors}
            {...register(`password`, {
              required: "Passwort ist erforderlich.",
              minLength: {
                value: 6,
                message: "Passwort muss mindestens 6 Zeichen lang sein",
              },
            })}
          />
          <Input.Error message={errors.password?.message} />
        </Input.Label>

        <Button type={"submit"} disabled={Object.keys(errors).length > 0}>
          Anmelden
        </Button>
      </form>

      <Button variant="secondary" className="w-full mt-4">
        <Link to={""}>Noch kein Account? Hier anmelden.</Link>
      </Button>
    </Layout>
  );
}
