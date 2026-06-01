import type { JSX } from "react";
import { CreateQuestion } from "~/src/features/question/components/create-questions";

export function QuestionPage(): JSX.Element {
  return (
    <>
      <h1>Question Page</h1>

      <CreateQuestion />
    </>
  );
}
