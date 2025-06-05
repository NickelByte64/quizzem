import {
  RemixiconComponentType,
  RiFoldersFill,
  RiFunctionFill,
  RiGamepadFill,
  RiQuestionnaireFill,
} from "@remixicon/react";

type GroupedNavigationLink = {
  identifier: string;
  label: string;
  Icon: RemixiconComponentType;
  links: NavigationLink[];
};

type NavigationLink = {
  identifier: string;
  to: string;
  label: string;
  external?: boolean;
};

export const NAVIGATION_LINKS: GroupedNavigationLink[] = [
  {
    identifier: "MAIN",
    label: "Main",
    Icon: RiFunctionFill,
    links: [
      {
        identifier: "HOME",
        to: "/",
        label: "Home",
      },
    ],
  },
  {
    identifier: "GAME",
    label: "Game",
    Icon: RiGamepadFill,
    links: [
      {
        identifier: "CREATE_GAME",
        to: "/game/create",
        label: "Create Game",
      },
      {
        identifier: "UPDATE_GAME",
        to: "/game",
        label: "Update Game",
      },
    ],
  },
  {
    identifier: "QUESTIONS",
    label: "Questions",
    Icon: RiQuestionnaireFill,
    links: [
      {
        identifier: "QUESTIONS_LIST",
        to: "/questions",
        label: "Questions List",
      },
    ],
  },
  {
    identifier: "CATEGORIES",
    label: "Categories",
    Icon: RiFoldersFill,
    links: [
      {
        identifier: "CATEGORIES_LIST",
        to: "/categories",
        label: "Categories List",
        external: true,
      },
    ],
  },
];
