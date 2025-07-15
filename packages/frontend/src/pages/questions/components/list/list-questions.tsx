import { PageableDto, QuestionDto } from "@quizzem/common";
import { JSX } from "react";
import { Loading } from "~/components/feedback/loading";
import { ListQuestionsItem } from "~/pages/questions/components/list/list-question-item";
import { useGetRemote } from "~/utils";

export function ListQuestions(): JSX.Element {
  const { data, isLoading } =
    useGetRemote<PageableDto<QuestionDto>>("question");

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data || data.data.length === 0) {
    return <div>no data</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {data.data.map((data) => (
        <ListQuestionsItem key={data.id} {...data} />
      ))}
    </div>
  );
}
