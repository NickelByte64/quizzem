import dayjs from "dayjs";
import type { UUID } from "node:crypto";
import { useState, type Dispatch, type JSX, type SetStateAction } from "react";
import { useNavigate } from "react-router";
import type { PageableDto } from "~/src/api/api.types";
import type { HttpResponse } from "~/src/api/http";
import { QUERY_CLIENT } from "~/src/api/query-client";
import type { UseQuizzemQuery } from "~/src/api/useQuizzemApi";
import {
  Button,
  List,
  QueryBoundary,
  RetryAlert,
  Snackbar,
  Stack,
  Typography,
} from "~/src/components";
import { Pagination } from "~/src/components/api";
import {
  QuestionApi,
  ROOT_QUESTIONS_TARGET,
} from "~/src/features/question/api/question.api";
import {
  ANSWER_MODE,
  MEDIA_TYPE,
  type AnswerMode,
  type MediaType,
  type QuestionDto,
} from "~/src/features/question/api/question.types";

export function ListQuestions(): JSX.Element {
  const [page, setPage] = useState(0);

  const { useGetQuestionList } = QuestionApi;
  const { data, isError, isLoading, refetch } = useGetQuestionList({ page });

  return (
    <>
      <Typography variant="h2">List Questions</Typography>

      <QueryBoundary
        hasContent={data && data.data.totalElements > 0}
        isLoading={isLoading}
        isError={isError}
        skeletons={<ListQuestionsSkeletons />}
        content={
          <ListQuestionsContent page={page} setPage={setPage} data={data!} />
        }
        emptyContent={<ListQuestionsEmpty />}
        error={<ListQuestionsContentError refetch={refetch} />}
      />
    </>
  );
}

type ListQuestionsContentProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  data: HttpResponse<PageableDto<QuestionDto>>;
};

function ListQuestionsContent(
  props: Readonly<ListQuestionsContentProps>,
): JSX.Element {
  const { page, setPage, data } = props;

  const navigate = useNavigate();

  function handlePageChange(newPage: number): void {
    setPage(newPage);
  }

  return (
    <>
      <List sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        {data.data.data.map((question) => (
          <List.ItemCard key={question.id}>
            <Typography component={"span"} ellipsis sx={{ flex: 1 }}>
              {question.text}
            </Typography>
            <Typography component={"span"}>
              {dayjs(question.createdAt).format("DD. MMM YYYY, hh:mm:ss")}
            </Typography>
            <Typography component={"span"}>
              {MEDIA_TYPE_LABEL.get(question.mediaType)}
            </Typography>
            <Typography component={"span"} sx={{ width: "10rem" }}>
              {ANSWER_MODE_LABELS.get(question.answerMode)}
            </Typography>
            <Stack sx={{ flexDirection: "row", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/questions/${question.id}`)}
              >
                Edit
              </Button>
              <DeleteButton id={question.id} />
            </Stack>
          </List.ItemCard>
        ))}
      </List>

      <Pagination
        page={page}
        totalPages={data.data.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

function ListQuestionsEmpty(): JSX.Element {
  return <Typography>No questions available</Typography>;
}

function ListQuestionsSkeletons(): JSX.Element {
  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <List.Item key={i}>
          <List.ItemCardSkeleton />
        </List.Item>
      ))}
    </List>
  );
}

type ListQuestionsContentErrorProps = {
  refetch: UseQuizzemQuery<PageableDto<QuestionDto>>["refetch"];
};

function ListQuestionsContentError(
  props: Readonly<ListQuestionsContentErrorProps>,
): JSX.Element {
  const { refetch } = props;
  return <RetryAlert refetch={refetch} />;
}

function DeleteButton(props: Readonly<{ id: UUID }>) {
  const { id } = props;

  const [open, setOpen] = useState(false);

  const { useDeleteQuestion } = QuestionApi;

  const { mutate } = useDeleteQuestion(id);

  return (
    <>
      <Button
        onClick={() => {
          mutate(undefined, {
            onSuccess: () => {
              QUERY_CLIENT.invalidateQueries({
                queryKey: [ROOT_QUESTIONS_TARGET],
              });
            },
            onError: () => {
              setOpen(true);
            },
          });
        }}
      >
        Delete
      </Button>
      <Snackbar
        alertProps={{
          title: "Question could not be deleted",
          severity: "error",
        }}
        snackBarProps={{ open, setOpen }}
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

const MEDIA_TYPE_LABEL = new Map<MediaType, string>([
  [MEDIA_TYPE.NONE, "None"],
  [MEDIA_TYPE.AUDIO, "Audio"],
  [MEDIA_TYPE.VIDEO, "Video"],
  [MEDIA_TYPE.IMAGE, "Image"],
]);
