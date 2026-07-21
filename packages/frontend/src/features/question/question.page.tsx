import type { UUID } from "node:crypto";
import { type JSX } from "react";
import { useParams } from "react-router";
import { Layout, type BreadcrumbsType } from "~/src/components";
import { CreateQuestion } from "~/src/features/question/components/create-questions/create-questions";
import { EditQuestion } from "~/src/features/question/components/edit-question/edit-question";
import { ListQuestions } from "~/src/features/question/components/list-questions";

const breadcrumbs: BreadcrumbsType[] = [
  { name: "Home", to: "/" },
  { name: "Questions", to: undefined },
];

export function QuestionPage(): JSX.Element {
  const { id } = useParams<{ id: UUID }>();

  return (
    <Layout title={"Question Page"} breadcrumbs={breadcrumbs}>
      <CreateQuestion />
      {id && <EditQuestion id={id} />}
      <ListQuestions />
    </Layout>
  );
}
