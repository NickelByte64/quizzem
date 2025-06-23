import { JSX } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Button, Divider, Headline, InlineLink } from "~/components";

const onDrop: DropzoneOptions["onDrop"] = (acceptedFiles) => {
  console.log(acceptedFiles);
};

export function UploadQuestion(): JSX.Element {
  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      noClick: true,
      noKeyboard: true,
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

        {acceptedFiles.length > 0 && (
          <div className="mt-4 w-full">
            <Headline as="h4">Liste von Dateien</Headline>
            <ol className="list-decimal pl-6">
              {acceptedFiles.map((file) => (
                <li key={file.path}>{file.name}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </>
  );
}
