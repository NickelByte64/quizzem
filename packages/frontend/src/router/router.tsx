import { createBrowserRouter } from "react-router";
import { Layout } from "~/src/components/global/layout";
import { GamePage } from "~/src/features/game/game.page";
import { HomePage } from "~/src/features/home/home.page";
import { HostPage } from "~/src/features/host/host.page";
import { PlayerPage } from "~/src/features/player/player.page";

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
        path: "game",
        element: <GamePage />,
      },
      {
        path: "player",
        element: <PlayerPage />,
      },
    ],
  },
]);
