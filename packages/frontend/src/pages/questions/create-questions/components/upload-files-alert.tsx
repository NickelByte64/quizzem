import { JSX } from "react";
import { FileRejection, FileWithPath } from "react-dropzone";
import { Alert } from "~/components";

type UploadFilesAlertProps = {
  status: "success" | "error" | "warning" | null;
  acceptedFiles: readonly FileWithPath[];
  fileRejections: readonly FileRejection[];
};

export function UploadFilesAlert(
  props: Readonly<UploadFilesAlertProps>
): JSX.Element {
  const { status = "error", acceptedFiles, fileRejections } = props;

  console.log(!!status, status);

  return (
    <Alert show={!!status} variant={getAlertVariant(status)} className="mt-8">
      {status === "success" && (
        <p>
          Deine {acceptedFiles.length > 1 ? "Dateien" : "Datei"}{" "}
          <span className="font-bold">
            {acceptedFiles.map((file) => file.name).join(", ")}{" "}
          </span>
          {acceptedFiles.length > 1 ? "wurden" : "wurde"} erfolgreich
          hochgeladen. Du kannst sie jetzt in der Fragenübersicht sehen.
        </p>
      )}
      {fileRejections.length > 0 ? (
        <p>
          Diese Datei{" "}
          <span className="font-bold">
            {fileRejections.map((file) => file.file.name).join(", ")}
          </span>{" "}
          wurde abgelehnt. Bitte überprüfe die Dateiformate und -größen.
        </p>
      ) : (
        status === "error" && (
          <p>
            Es ist ein Fehler aufgetreten. Bitte überprüfe deine Dateien und
            versuche es erneut.
          </p>
        )
      )}
    </Alert>
  );
}

function getAlertVariant(
  status: "success" | "error" | "warning" | null
): "success" | "error" | "warning" {
  return status ?? "warning";
}
