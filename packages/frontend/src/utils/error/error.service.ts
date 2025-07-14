import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";

function resetError(
  setRemoteError: Dispatch<SetStateAction<AxiosError | null>>,
  timeout: number = 5000
) {
  setTimeout(() => setRemoteError(null), timeout);
}

function composeErrorMessage(error: AxiosError): string {
  return error.response?.data?.message || "An unexpected error occurred.";
}

export const ErrorService = {
  resetError,
  composeErrorMessage,
};
