import { createBrowserRouter } from "react-router";
import { Layout } from "~/src/components/global/layout";
import { GamePage } from "~/src/features/game/game.page";
import { HomePage } from "~/src/features/home/home.page";
import { HostPage } from "~/src/features/host/host.page";
import { PlayerPage } from "~/src/features/player/player.page";
import { QuestionPage } from "~/src/features/question/question.page";

export const ROUTES = [
  { path: "/", name: "Home" },
  { path: "/host", name: "Host" },
  { path: "/games", name: "Games" },
  { path: "/player", name: "Player" },
  { path: "/questions", name: "Questions" },
];

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "host",
        element: <HostPage />,
      },
      {
        path: "games",
        element: <GamePage />,
        children: [
          {
            path: ":id",
            element: <GamePage />,
          },
        ],
      },
      {
        path: "player",
        element: <PlayerPage />,
      },
      {
        path: "questions",
        element: <QuestionPage />,
        children: [
          {
            path: ":id",
            element: <QuestionPage />,
          },
        ],
      },
    ],
  },
]);
