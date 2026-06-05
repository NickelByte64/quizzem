import { type JSX } from "react";
import { Headline } from "~/src/components";
import { CreateQuestion } from "~/src/features/question/components/create-questions/create-questions";
import { EditQuestion } from "~/src/features/question/components/edit-question";
import { ListQuestions } from "~/src/features/question/components/list-questions";

export function QuestionPage(): JSX.Element {
  return (
    <>
      <Headline title="Question Page" />
      <CreateQuestion />
      <ListQuestions />
      <EditQuestion />
    </>
  );
}
