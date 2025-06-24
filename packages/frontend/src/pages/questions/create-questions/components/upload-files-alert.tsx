import { JSX } from "react";
import { FileRejection, FileWithPath } from "react-dropzone";
import { Alert } from "~/components";

type UploadFilesAlertProps = {
  isSuccess: boolean;
  isError: boolean;
  acceptedFiles: readonly FileWithPath[];
  fileRejections: readonly FileRejection[];
};

export function UploadFilesAlert(
  props: Readonly<UploadFilesAlertProps>
): JSX.Element {
  const { isSuccess, isError, acceptedFiles, fileRejections } = props;

  return (
    <Alert
      show={isSuccess || isError}
      variant={getAlertVariant(isSuccess, isError)}
      className="mt-8"
    >
      {isSuccess && (
        <p>
          Deine {acceptedFiles.length > 1 ? "Dateien" : "Datei"}{" "}
          <span className="font-bold">
            {acceptedFiles.map((file) => file.name).join(", ")}{" "}
          </span>
          {acceptedFiles.length > 1 ? "wurden" : "wurde"} erfolgreich
          hochgeladen. Du kannst sie jetzt in der Fragenübersicht sehen.
        </p>
      )}
      {isError && (
        <p>
          Es ist ein Fehler aufgetreten. Bitte überprüfe deine Dateien und
          versuche es erneut.
        </p>
      )}
    </Alert>
  );
}

function getAlertVariant(
  isSuccess: boolean,
  isError: boolean
): "success" | "error" | "warning" {
  if (isSuccess) return "success";
  if (isError) return "error";
  return "warning";
}
