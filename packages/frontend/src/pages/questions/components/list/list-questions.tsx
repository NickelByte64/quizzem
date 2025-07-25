import { PageableDto, QuestionDto } from "@quizzem/common";
import { RiPencilFill } from "@remixicon/react";
import { UUID } from "crypto";
import { Dispatch, JSX, SetStateAction } from "react";
import { Card, IconButton, Loading } from "~/components";
import { useGetRemote } from "~/utils";

type ListQuestionsProps = {
  setSelectedQuestionId: Dispatch<SetStateAction<UUID | null>>;
};

export function ListQuestions(
  props: Readonly<ListQuestionsProps>
): JSX.Element {
  const { setSelectedQuestionId } = props;

  const { data: questions, isLoading } =
    useGetRemote<PageableDto<QuestionDto>>("questions");

  if (isLoading) {
    return <Loading />;
  }

  if (!questions?.data || questions.data.length === 0) {
    return <div>no data</div>;
  }

  return (
    <Card>
      <Card.Body>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Frage</th>
              <th>Typ</th>
              <th>Richtige Antwort</th>
              <th>Antworten</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {questions.data.map((question, i) => (
              <tr key={question.id}>
                <td>{String(i + 1).padStart(2, "0")}</td>
                <td>{question.question}</td>
                <td>{question.questionType}</td>
                <td>{question.correctAnswer}</td>
                <td>{question.answers ?? "-"}</td>
                <td>
                  <IconButton
                    onClick={() => setSelectedQuestionId(question.id)}
                  >
                    <RiPencilFill />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
