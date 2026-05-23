import {
  RemixiconComponentType,
  RiFunctionFill,
  RiQuestionnaireFill,
  RiShieldFill,
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

const PUBLIC_NAVIGATION_LINKS: GroupedNavigationLink[] = [
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
];

const AUTH_NAVIGATION_LINKS: GroupedNavigationLink[] = [
  {
    identifier: "AUTH",
    label: "Authentication",
    Icon: RiShieldFill,
    links: [
      {
        identifier: "SIGN_IN",
        to: "auth/sign-in",
        label: "Sign in",
      },
      {
        identifier: "SIGN_UP",
        to: "auth/sign-up",
        label: "Sign up",
      },
    ],
  },
];

const QUESTION_NAVIGATION_LINKS: GroupedNavigationLink[] = [
  {
    identifier: "QUESTIONS",
    label: "Questions",
    Icon: RiQuestionnaireFill,
    links: [
      {
        identifier: "QUESTIONS_LIST",
        to: "/questions",
        label: "Fragenkatalog",
      },
      {
        identifier: "CREATE_QUESTIONS",
        to: "/questions/create",
        label: "Fragen erstellen",
      },
    ],
  },
];

export function buildNavigationLinks(
  authenticated: boolean | undefined
): GroupedNavigationLink[] {
  const links: GroupedNavigationLink[] = [...PUBLIC_NAVIGATION_LINKS];

  if (authenticated) {
    links.push(...QUESTION_NAVIGATION_LINKS);
  } else {
    links.push(...AUTH_NAVIGATION_LINKS);
  }

  return links;
}
