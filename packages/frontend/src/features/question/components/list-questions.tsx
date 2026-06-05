import type { JSX } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/src/components";
import { Headline } from "~/src/components/typography/headline";
import { QuestionApi } from "~/src/features/question/api/question.api";

export function ListQuestions(): JSX.Element {
  const navigate = useNavigate();

  const { useGetQuestionListApi } = QuestionApi;

  const { data } = useGetQuestionListApi();

  return (
    <>
      <Headline as="h2" title="List Questions" />

      <ul className="flex flex-col gap-2">
        {data?.data.map((question) => (
          <li
            key={question.id}
            className="flex items-center justify-between gap-4 rounded-lg border p-4"
          >
            <span className="truncate">{question.text}</span>
            <div className="flex gap-2">
              <Button onClick={() => navigate(`/questions/${question.id}`)}>
                Edit
              </Button>
              <Button onClick={() => navigate(`/questions/${question.id}`)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
