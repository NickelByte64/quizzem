import { type JSX } from "react";
import {
  Breadcrumbs,
  Typography,
  type BreadcrumbsType,
} from "~/src/components";
import { CreateQuestion } from "~/src/features/question/components/create-questions/create-questions";

const breadcrumbs: BreadcrumbsType[] = [
  { name: "Home", to: "/" },
  { name: "Questions", to: undefined },
];

export function QuestionPage(): JSX.Element {
  return (
    <>
      <Typography variant="h1">Question Page</Typography>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <CreateQuestion />
      {/* <ListQuestions /> */}
      {/* <EditQuestion />  */}
    </>
  );
}
