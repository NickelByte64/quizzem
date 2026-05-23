import { JSX } from "react";
import { Divider, Headline, Todo } from "~/components";
import { UploadQuestion } from "~/pages/questions/components/create/upload-question";

export function CreatePage(): JSX.Element {
  return (
    <>
      <Headline as={"h1"}>Fragen erstellen</Headline>
      <UploadQuestion />
      <Divider withText text="oder" />
      <Todo />
    </>
  );
}
