import clsx from "clsx";
import { JSX, useCallback, useState } from "react";
import { FileRejection, FileWithPath, useDropzone } from "react-dropzone";
import { Button, Divider, Headline, InlineLink } from "~/components";
import { UploadFilesAlert } from "~/pages/questions/components/create/upload-files-alert";
import { usePostRemote } from "~/utils";

export function UploadQuestion(): JSX.Element {
  const [status, setStatus] = useState<"success" | "error" | "warning" | null>(
    null
  );

  const resetStatus = () => setTimeout(() => setStatus(null), 5000);

  const { mutate } = usePostRemote<FormData, void>("questions/upload");

  /**
   * Handles the drop event for the dropzone.
   * This function creates a FormData object, appends the accepted files to it
   * and submits it using the provided mutate function.
   *
   * @returns {DropzoneOptions["onDrop"]} A function that handles the drop event.
   */
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], fileRejections: FileRejection[]) => {
      // Reset status before processing files
      setStatus(null);

      // If there are file rejections, log them and set status to error
      if (fileRejections.length > 0 || acceptedFiles.length === 0) {
        setStatus("error");
        resetStatus();
        return;
      }

      // Create FormData and append accepted files
      const formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append("files", file);
      });

      mutate(formData, {
        onSuccess: () => {
          setStatus("success");
          resetStatus();
        },
        onError: () => {
          setStatus("error");
          resetStatus();
        },
      });
    },
    [mutate]
  );

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      "application/json": [".json"],
      "text/csv": [".csv"],
    },
    maxSize: 5 * 1024 * 1024, // 5 MB
    multiple: true,
    maxFiles: 2,
    disabled: !!status,
  });

  return (
    <>
      <Headline as={"h3"}>Fragen hochladen</Headline>
      <p>
        Die passenden Vorlagen für JSON und CSV kannst du{" "}
        <InlineLink
          Component={"a"}
          // TODO: Update the link to the correct path
          href={"questions_templates.zip"}
          download
        >
          hier
        </InlineLink>{" "}
        herunterladen, um sicherzustellen, dass deine Dateien im richtigen
        Format sind.
      </p>

      <UploadFilesAlert
        status={status}
        acceptedFiles={acceptedFiles}
        fileRejections={fileRejections}
      />

      <div
        {...getRootProps()}
        className={clsx(
          "my-8 border border-dashed rounded-xl p-8 bg-base-200",
          status === "error" && "border-error",
          status === "success" && "border-success"
        )}
      >
        <div
          className={clsx(
            "flex flex-col items-center gap-4",
            !!status && "opacity-50 cursor-not-allowed pointer-events-none"
          )}
        >
          <div className="text-center">
            {isDragActive ? (
              <p>Dateien hier ablegen ...</p>
            ) : (
              <>
                <p className="font-semibold">
                  Ziehe deine Datei hierher oder klicke zum Auswählen
                </p>
                <p className="text-sm mt-2">
                  Unterstützt werden <code>.json</code> und <code>.csv</code> –
                  Max. 5 MB pro Datei
                </p>
              </>
            )}
          </div>
          <input {...getInputProps()} />

          <Divider withText text="oder" />

          <Button onClick={open}>Durchsuchen</Button>
        </div>
      </div>
    </>
  );
}
