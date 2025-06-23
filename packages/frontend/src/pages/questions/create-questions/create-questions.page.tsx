import { JSX } from "react";
import { Divider, Headline, Layout } from "~/components";
import { CreateQuestionDescription } from "~/pages/questions/create-questions/components/create-question-description";
import { CreateQuestionForm } from "~/pages/questions/create-questions/components/create-question-form";
import { UploadQuestion } from "~/pages/questions/create-questions/components/upload-question";

export function CreateQuestionsPage(): JSX.Element {
  return (
    <Layout>
      <Headline as={"h1"}>Fragen erstellen</Headline>
      <CreateQuestionDescription />
      <UploadQuestion />
      <Divider withText text="oder" />
      <CreateQuestionForm />
    </Layout>
  );
}
