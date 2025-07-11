import { CreateQuestionsPage } from "~/pages/questions/create-questions/create-questions.page";
import { QuestionsPage } from "~/pages/questions/questions.page";
import { createRoutes } from "~/router/routes.service";

export const QUESTION_ROUTES = createRoutes("/questions", [
  {
    index: true,
    path: "/",
    element: <QuestionsPage />,
  },
  {
    path: "/create",
    element: <CreateQuestionsPage />,
  },
]);
