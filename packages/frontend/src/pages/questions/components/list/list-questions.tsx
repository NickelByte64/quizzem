import { PageableDto, QuestionDto } from "@quizzem/common";
import { JSX } from "react";
import { Card, Loading } from "~/components";
import { useGetRemote } from "~/utils";

export function ListQuestions(): JSX.Element {
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
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}
