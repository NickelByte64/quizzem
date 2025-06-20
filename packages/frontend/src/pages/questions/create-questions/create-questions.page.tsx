import { JSX } from "react";
import { Button, Headline, Layout } from "~/components";
import { CreateQuestionForm } from "~/pages/questions/create-questions/components/create-question-form";

export function CreateQuestionsPage(): JSX.Element {
  return (
    <Layout>
      <Headline as={"h1"}>Fragen erstellen</Headline>

      <Headline as={"h3"}>Fragen hochladen</Headline>
      <div className="border border-dashed p-4 rounded-xl flex flex-col items-center justify-center">
        <p>Drag files to upload</p>
        <div className="divider">ODER</div>
        <Button>Browse files</Button>
      </div>

      <div className="divider">ODER</div>

      <CreateQuestionForm />
    </Layout>
  );
}
