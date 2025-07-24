import { JSX } from "react";
import { Headline } from "~/components";
import { ListQuestions } from "~/pages/questions/components/list/list-questions";

export function QuestionsPage(): JSX.Element {
  return (
    <>
      <Headline as={"h1"}>Fragenkatalog</Headline>
      <ListQuestions />
    </>
  );
}
