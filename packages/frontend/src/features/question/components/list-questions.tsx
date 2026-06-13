import dayjs from "dayjs";
import type { UUID } from "node:crypto";
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
  MEDIA_TYPE,
  type AnswerMode,
  type MediaType,
} from "~/src/features/question/api/question.types";

export function ListQuestions(): JSX.Element {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const { useGetQuestionList } = QuestionApi;

  const { data } = useGetQuestionList({ page });

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
            className="flex items-center justify-between gap-4 rounded-lg border px-4 py-2"
          >
            <span className="truncate flex-1">{question.text}</span>
            <span>
              {dayjs(question.createdAt).format("DD. MMM YYYY, hh:mm:ss")}
            </span>
            <span className="16">
              {MEDIA_TYPE_LABEL.get(question.mediaType)}
            </span>
            <span className="w-40">
              {ANSWER_MODE_LABELS.get(question.answerMode)}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/questions/${question.id}`)}
              >
                Edit
              </Button>
              <DeleteButton id={question.id} />
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

function DeleteButton(props: Readonly<{ id: UUID }>) {
  const { id } = props;

  const { useDeleteQuestion } = QuestionApi;

  const { mutate } = useDeleteQuestion(id);

  return (
    <Button
      onClick={() => {
        mutate(undefined, {
          onSuccess: () =>
            QUERY_CLIENT.invalidateQueries({
              queryKey: [ROOT_QUESTIONS_TARGET],
            }),
        });
      }}
    >
      Delete
    </Button>
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

const MEDIA_TYPE_LABEL = new Map<MediaType, string>([
  [MEDIA_TYPE.NONE, "None"],
  [MEDIA_TYPE.AUDIO, "Audio"],
  [MEDIA_TYPE.VIDEO, "Video"],
  [MEDIA_TYPE.IMAGE, "Image"],
]);
