import { CreateQuestionsPage } from "~/pages/questions/create-questions/create-questions.page";
import { QuestionsPage } from "~/pages/questions/questions.page";
import { ProtectedRoute } from "~/router/components/protected-route";
import { createRoutes } from "~/router/routes.service";

export const QUESTION_ROUTES = createRoutes("/questions", [
  {
    index: true,
    path: "/",
    element: (
      <ProtectedRoute>
        <QuestionsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <CreateQuestionsPage />
      </ProtectedRoute>
    ),
  },
]);
