import { UUID } from "crypto";
import { JSX, useState } from "react";
import { Headline } from "~/components";
import { ListQuestions } from "~/pages/questions/components/list/list-questions";
import { UpdateQuestion } from "~/pages/questions/components/list/update-question";

export function QuestionsPage(): JSX.Element {
  const [selectedQuestionId, setSelectedQuestionId] = useState<UUID | null>(
    null
  );

  return (
    <>
      <Headline as={"h1"}>Fragenkatalog</Headline>
      <ListQuestions setSelectedQuestionId={setSelectedQuestionId} />

      <UpdateQuestion
        selectedQuestionId={selectedQuestionId}
        setSelectedQuestionId={setSelectedQuestionId}
      />
    </>
  );
}
