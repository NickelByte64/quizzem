import dayjs from "dayjs";
import { useState, type JSX } from "react";
import { useNavigate } from "react-router";
import { QUERY_CLIENT } from "~/src/api/query-client";
import { Button } from "~/src/components";
import { Pagination } from "~/src/components/api";
import { Headline } from "~/src/components/typography/headline";
import {
  QuestionApi,
  ROOT_QUESTIONS_TARGET,
} from "~/src/features/question/api/question.api";
import {
  ANSWER_MODE,
  type AnswerMode,
} from "~/src/features/question/api/question.types";

export function ListQuestions(): JSX.Element {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const { useGetQuestionList, useDeleteQuestionsById } = QuestionApi;

  const { data } = useGetQuestionList({ page });
  const { mutate } = useDeleteQuestionsById();

  function handlePageChange(newPage: number): void {
    setPage(newPage);
  }

  return (
    <>
      <Headline as="h2" title="List Questions" />

      <ul className="flex flex-col gap-2 mt-4">
        {data?.data.data.map((question) => (
          <li
            key={question.id}
            className="flex items-center justify-between gap-4 rounded-lg border p-4"
          >
            <span className="truncate flex-1">{question.text}</span>
            <span>
              {dayjs(question.createdAt).format("DD. MMM YYYY, hh:mm:ss")}
            </span>
            <span className="w-40">
              {ANSWER_MODE_LABELS.get(question.type)}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/questions/${question.id}`)}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  mutate(
                    { id: question.id },
                    {
                      onSuccess: () =>
                        QUERY_CLIENT.invalidateQueries({
                          queryKey: [ROOT_QUESTIONS_TARGET],
                        }),
                    },
                  );
                }}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={data?.data.totalPages ?? 0}
        onPageChange={handlePageChange}
      />
    </>
  );
}

const ANSWER_MODE_LABELS = new Map<AnswerMode, string>([
  [ANSWER_MODE.FREE_TEXT, "Free Text"],
  [ANSWER_MODE.MULTIPLE_CHOICE, "Multiple Choice"],
  [ANSWER_MODE.SINGLE_CHOICE, "Single Choice"],
  [ANSWER_MODE.NUMERIC, "Numeric"],
  [ANSWER_MODE.ORDERING, "Ordering"],
  [ANSWER_MODE.TRUE_FALSE, "True/False"],
]);
