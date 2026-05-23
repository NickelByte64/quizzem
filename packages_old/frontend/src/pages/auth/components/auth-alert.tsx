import { AxiosError } from "axios";
import { JSX } from "react";
import { Alert } from "~/components";
import { ErrorService } from "~/utils/error/error.service";

type AuthAlertProps = {
  remoteError: AxiosError | null;
};

export function AuthAlert(props: Readonly<AuthAlertProps>): JSX.Element {
  const { remoteError } = props;

  return (
    <Alert show={!!remoteError} variant={"error"} className="mb-4">
      {remoteError && ErrorService.composeErrorMessage(remoteError)}
    </Alert>
  );
}
