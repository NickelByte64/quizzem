import { type JSX } from "react";
import { Layout, type BreadcrumbsType } from "~/src/components";
import { CreateQuestion } from "~/src/features/question/components/create-questions/create-questions";
import { ListQuestions } from "~/src/features/question/components/list-questions";

const breadcrumbs: BreadcrumbsType[] = [
  { name: "Home", to: "/" },
  { name: "Questions", to: undefined },
];

export function QuestionPage(): JSX.Element {
  return (
    <Layout title={"Question Page"} breadcrumbs={breadcrumbs}>
      <CreateQuestion />
      <ListQuestions />
      {/* <EditQuestion />  */}
    </Layout>
  );
}
