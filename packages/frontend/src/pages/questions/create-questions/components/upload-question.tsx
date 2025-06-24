import { UseMutateFunction } from "@tanstack/react-query";
import { JSX } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Button, Divider, Headline, InlineLink } from "~/components";
import { UploadFilesAlert } from "~/pages/questions/create-questions/components/upload-files-alert";
import { usePostRemote } from "~/utils";

/**
 * Handles the drop event for the dropzone.
 * This function creates a FormData object, appends the accepted files to it
 * and submits it using the provided mutate function.
 *
 * @returns {DropzoneOptions["onDrop"]} A function that handles the drop event.
 */
function onDrop(
  mutate: UseMutateFunction<void, unknown, FormData>
): DropzoneOptions["onDrop"] {
  return (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      console.error("File rejections:", fileRejections);
      return;
    }

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    mutate(formData);
  };
}

export function UploadQuestion(): JSX.Element {
  const { mutate, isSuccess, isError } = usePostRemote<FormData, void>(
    "questions/upload"
  );

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop: onDrop(mutate),
    noClick: true,
    noKeyboard: true,
    accept: {
      "application/json": [".json"],
      "text/csv": [".csv"],
    },
    maxSize: 5 * 1024 * 1024, // 5 MB
    multiple: true,
    maxFiles: 2,
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
        isError={isError}
        isSuccess={isSuccess}
        acceptedFiles={acceptedFiles}
        fileRejections={fileRejections}
      />

      <div
        {...getRootProps()}
        className="my-8 border border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-4"
      >
        <div className="text-center">
          {isDragActive ? (
            <p>Dateien hier ablegen ...</p>
          ) : (
            <>
              <p className="font-semibold">
                Ziehe deine Datei hierher oder klicke zum Auswählen
              </p>
              <p className="text-sm text-neutral-content">
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
    </>
  );
}
